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
  ],
  exports: [AuthService]
})
export class AppModule { }
