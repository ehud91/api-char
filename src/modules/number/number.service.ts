import { Inject,   Injectable  } from "@nestjs/common";
import { Cache } from "cache-manager";
import { Constants } from "../main/const/constants.model";
import { ConstantsNumber } from "./const/constants.model";
import { NumberStoreDto } from "./dto/numberstore.model";
import config from '../main/config/config';


@Injectable()
export class NumberService {

    constructor(@Inject(Constants.CACHE_MANAGER) private cacheManager: Cache) {}


    async insertNewNumber(number: number, userId: string): Promise<NumberStoreDto> {

        const storeKey = ConstantsNumber.REDIS_KEY_NUMBER + userId;

        const numberResult: NumberStoreDto = await this.getNumber(storeKey);
        if (numberResult) {

            numberResult.number = number;
            this.updateNumber(storeKey, numberResult, config().redis.cache_ttl);
            return numberResult;
        }

        const newUser = new NumberStoreDto(userId, "", number);
        await this.insertNumber(storeKey, newUser, config().redis.cache_ttl);
    }


    async getNumber(key: string): Promise<NumberStoreDto> {
        return await this.cacheManager.get(key);
    }

    async insertNumber(key: string, data: NumberStoreDto, ttl: number): Promise<void> {
        await this.cacheManager.set(key, data, ttl);
    }

    async updateNumber(key: string, data: NumberStoreDto, ttl: number): Promise<void> {
        await this.cacheManager.del(key);
        await this.cacheManager.set(key, data, ttl);
    }


}