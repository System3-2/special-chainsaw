import { Controller, Get, UseGuards, Redirect, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './google.service';
@Controller('google')
export class GoogleController {
  constructor(private googleService: GoogleService) { }
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('redirect')
  //@Redirect('/')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.googleService.googleLogin(req)
  }
}

