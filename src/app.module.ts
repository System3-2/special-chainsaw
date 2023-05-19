import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { jwtConstants } from './constants';
import { GithubModule } from './github/github.module';
import { GoogleModule } from './google/google.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './Exceptions/NotFoundException';
import { InternalServerErrorExceptionFilter } from './Exceptions/InternalServerErrorException';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    GoogleModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GithubModule,
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorExceptionFilter
    },
  ],
  exports: [AuthService]
})
export class AppModule { }
