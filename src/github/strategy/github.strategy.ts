import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get('GITHUB_CLIENT_ID'),
      clientSecret: config.get('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8080/github/redirects',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    // const user = await this.authService.validateOAuthUser('github', profile.id);
    //console.log(accessToken)
    done(null, profile);
  }
}
