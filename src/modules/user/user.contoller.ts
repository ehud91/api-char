import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    HttpCode,
    UsePipes,
    ValidationPipe,
    Query,
    BadRequestException } from  '@nestjs/common';

import { StatusCodes } from 'http-status-codes';
import { Constants } from '../main/const/constants.model';
import { ApiResponseDto } from '../main/dto/response.model';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/user.model';
import { Messages } from './const/Messages.model';
import { UserStoreDto } from './dto/userstore.model';
import { UserResponseDto } from './dto/userresponse.mode';
import { LoggerService } from '../main/logs/logger.service';
import { LogTypes } from '../main/logs/logtypes.model';

@Controller(Constants.API_VERSION + 'userid')
export class UserController {

    constructor(private userService: UserService, private logger: LoggerService) {}

    @Get('/') 
    @HttpCode(StatusCodes.OK)
    async getUser(@Body() user: UserRequestDto) {

        let userResult: UserStoreDto;
        
        try {
            userResult = await this.userService.getUser(user.userId);
        } catch (error) {
        
            // Exception error
            console.error(Messages.GET_USER_FALIED, error);
            this.logger.writeLog(LogTypes.EXCEPTION, 'Get User', error);
            return new ApiResponseDto(
                Constants.SUCCESS_FALSE, 
                Messages.GET_USER_FALIED,
                [],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }    

        // User not found
        if (userResult == null) {
            this.logger.writeLog(LogTypes.ERROR, 'Get User', 'User not found');
            throw new BadRequestException(Messages.USER_NOT_FOUND, 
                { cause: new Error(), description: Messages.USER_NOT_FOUND })
        }
            
        // User does not have both data character and number
        if (!this.userService.userHasCharacterAndNumber(userResult)) {
            this.logger.writeLog(LogTypes.ERROR, 'Get User', 'User found without both character and number');
            throw new BadRequestException(Messages.USER_DO_NOT_HAVE_DATA, 
                { cause: new Error(), description: Messages.USER_DO_NOT_HAVE_DATA })
        }
        
        // Display the user with character and number 
        const displayResult: UserResponseDto = await this.userService.getUserCharacterAndNumber(userResult);
        this.logger.writeLog(LogTypes.INFO, 'Get User', 'User found with both character and number');
        return new ApiResponseDto(
            Constants.SUCCESS_TRUE, 
            Messages.GET_USER_SUCCESS,
            displayResult,
            StatusCodes.OK);
    
    }
}