import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubService } from './github.service';
@Controller('github')
export class GithubController {
  constructor(private githubService: GithubService) { }

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }

  @Get('redirects')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    return this.githubService.githubLogin(req)
  }


  @Get('callback')
  @UseGuards(AuthGuard('github'))
  googleAuthRedirect(@Req() req) {
    return this.githubService.githubLogin(req)
  }
}
