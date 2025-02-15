import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AuthModule} from "./auth/auth.module";
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        
      }),
      inject: [ConfigService],
    }),
      AuthModule,
      CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
