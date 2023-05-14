import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SignUpDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor() { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return loginDto
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return signUpDto
  }
}
