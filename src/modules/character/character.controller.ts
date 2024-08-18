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

import { CharacterRequestDto } from './dto/character.model';
import { CharacterService } from './character.service';
import { StatusCodes } from 'http-status-codes';
import { Constants } from '../main/const/constants.model';
import { CharacterStoreDto } from './dto/characterstore.model';
import { ApiResponseDto } from '../main/dto/response.model';
import { Messages } from './const/Messages.model';
import { LoggerService } from '../main/logs/logger.service';
import { LogTypes } from '../main/logs/logtypes.model';

@Controller(Constants.API_VERSION + 'character')
export class CharacterController {
    
    constructor(private characterService: CharacterService, private logger: LoggerService) {}

    @Post('/')
    @HttpCode(StatusCodes.OK)
    async insertCharacter(@Body() characterRequest: CharacterRequestDto): Promise<ApiResponseDto> {

        try {

            const characterResult: CharacterStoreDto = 
                    await this.characterService.insertNewCharacter(
                                characterRequest.character, 
                                characterRequest.userId);

            this.logger.writeLog(LogTypes.INFO, 'Set new Character', 'New Character inserted');
            return new ApiResponseDto(
                Constants.SUCCESS_TRUE, 
                Messages.INSERT_NEW_CHARACTER_SUCCESS,
                characterResult,
                StatusCodes.OK);     
        } catch (error) {

            this.logger.writeLog(LogTypes.EXCEPTION, 'Set new Character', error);
            return new ApiResponseDto(
                Constants.SUCCESS_FALSE, 
                Messages.INSERT_NEW_CHARACTER_FALIED,
                [],
                StatusCodes.INTERNAL_SERVER_ERROR);     
        }
    }
} 