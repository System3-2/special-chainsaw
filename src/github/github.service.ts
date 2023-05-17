import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {

  githubLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      user: req.user
    }
  }
}
