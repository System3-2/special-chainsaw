import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { GoogleModule } from './google/google.module';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
    GoogleModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GithubModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AppModule { }
