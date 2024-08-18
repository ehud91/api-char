import { Module } from '@nestjs/common';
import { NumberController } from './number.controller';
import { NumberService } from './number.service';
import { LoggerService } from '../main/logs/logger.service';

@Module({
    controllers: [NumberController],
    providers: [NumberService,
                LoggerService
               ]
})

export class NumberModule {}