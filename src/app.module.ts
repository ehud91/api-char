import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule} from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './modules/character/character.module';
import { NumberModule } from './modules/number/number.module';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from './modules/main/logs/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import config from './modules/main/config/config';
import { RateLimiterMIdelware } from './modules/main/middlewares/ratelimiter.middleware';
import { CharacterController } from './modules/character/character.controller';
import { NumberController } from './modules/number/number.controller';
import { UserController } from './modules/user/user.contoller';




@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: '.env'
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (config) => {
        const store = await redisStore({
          socket: {
            host: config.get("redis.host"),
            port: config.get("redis.port")
          }
        });
        return { store }
      },
      inject: [ConfigService]
    }),
    LoggerModule,
    CharacterModule,
    NumberModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RateLimiterMIdelware)
    .forRoutes(
      CharacterController, 
      NumberController, 
      UserController) // Use the middlware for controllers
  }
}
