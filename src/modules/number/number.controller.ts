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
    Query } from  '@nestjs/common';

import { StatusCodes } from 'http-status-codes';
import { NumberRequestDto } from './dto/number.model';
import { NumberService } from './number.service';
import { ApiResponseDto } from '../main/dto/response.model';
import { Constants } from '../main/const/constants.model';
import { Messages } from './const/Messages.model';
import { LoggerService } from '../main/logs/logger.service';
import { LogTypes } from '../main/logs/logtypes.model';


@Controller(Constants.API_VERSION + 'number')
export class NumberController {

    constructor(private numberService: NumberService, private logger: LoggerService) {}

    @Post('/')
    @HttpCode(StatusCodes.OK)
    async insertNumber(@Body() numberRequest: NumberRequestDto): Promise<ApiResponseDto> {

        try {
            const result = await this.numberService.insertNewNumber(numberRequest.number, numberRequest.userId);
            
            this.logger.writeLog(LogTypes.INFO, 'Set new Number', 'New Number inserted');
            return new ApiResponseDto(
                Constants.SUCCESS_TRUE, 
                Messages.INSERT_NEW_NUMBER_SUCCESS,
                [],
                StatusCodes.OK); 
        
        } catch(error) {
            
            this.logger.writeLog(LogTypes.EXCEPTION, 'Set new Number', error);
            return new ApiResponseDto(
                Constants.SUCCESS_FALSE, 
                Messages.INSERT_NEW_NUMBER_FALIED,
                [],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}