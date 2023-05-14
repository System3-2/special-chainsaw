import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() { }

  @Post('login')
  login(@Body() req) {
    return req
  }

  @Post('signup')
  signUp(@Body() req) {
    return req
  }
}
