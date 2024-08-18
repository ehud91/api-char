import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { LoggerService } from '../main/logs/logger.service';

@Module({
    controllers: [CharacterController],
    providers: [CharacterService,
                LoggerService
               ]
})

export class CharacterModule {}