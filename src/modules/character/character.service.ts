import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Cache } from "cache-manager";
import { ConstantsCharacter } from './const/constants.model';
import { Constants } from '../main/const/constants.model';
import { CharacterStoreDto } from "./dto/characterstore.model";
import config from '../main/config/config';



@Injectable()
export class CharacterService {


    constructor(@Inject(Constants.CACHE_MANAGER) private cacheManager: Cache) {}

    async insertNewCharacter(character: string, userId: string): Promise<CharacterStoreDto> {

        let characterResult: CharacterStoreDto;
        const storeKey = ConstantsCharacter.REDIS_KEY_CHAR + userId;
        
        try {
            characterResult = await this.getCharacter(storeKey);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (characterResult) {

            characterResult.character = character;
            try {
                this.updateCharacter(storeKey, characterResult, config().redis.cache_ttl);
            } catch (error) {
                throw new InternalServerErrorException(error);
            }
            return characterResult;
        }

        const newUser = new CharacterStoreDto(userId, character, -1);

        try {
            await this.insertCharacter(storeKey, newUser, config().redis.cache_ttl);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return newUser;
    }


    async getCharacter(key: string): Promise<CharacterStoreDto> {
        return await this.cacheManager.get(key);
    }

    async insertCharacter(key: string, data: CharacterStoreDto, ttl: number): Promise<void> {
        await this.cacheManager.set(key, data, ttl);
    }

    async updateCharacter(key: string, data: CharacterStoreDto, ttl: number): Promise<void> {
        await this.cacheManager.del(key);
        await this.cacheManager.set(key, data, ttl);
    }


}