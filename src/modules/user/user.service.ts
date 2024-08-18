import { Injectable, Inject  } from "@nestjs/common";
import { Cache } from "cache-manager";
import { Constants } from "../main/const/constants.model";
import { ConstantsUser } from "./const/constants.model";
import { UserStoreDto } from "./dto/userstore.model";
import { UserResponseDto } from "./dto/userresponse.mode";


@Injectable()
export class UserService {

    constructor(@Inject(Constants.CACHE_MANAGER) private cacheManager: Cache) {}

    async getUser(userId: string): Promise<UserStoreDto> {

        const storeKey = ConstantsUser.REDIS_KEY_USER + userId;
        const userResult: UserStoreDto = await this.findUser(storeKey); 
        
        if (userResult) { return userResult; }
        return null;
    }

    async userHasCharacterAndNumber(userResult: UserStoreDto): Promise<boolean> {
        return (userResult.character.length > 0 && userResult.number != -1);
    }

    async getUserCharacterAndNumber(user: UserStoreDto): Promise<UserResponseDto> {
        const resultString = user.character + '_' + user.number;
        return new UserResponseDto(resultString);
    }


    async findUser(key: string): Promise<UserStoreDto> {
        return await this.cacheManager.get(key);
    }

}