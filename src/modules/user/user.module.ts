import { Module } from '@nestjs/common';
import { UserController } from './user.contoller';
import { UserService } from './user.service';
import { LoggerService } from '../main/logs/logger.service';


@Module({
    controllers: [UserController],
    providers: [UserService,
                LoggerService
               ]
})

export class UserModule {}