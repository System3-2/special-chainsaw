import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { GithubStrategy } from './strategy/github.strategy';

@Module({
  providers: [GithubService, GithubStrategy],
  controllers: [GithubController]
})
export class GithubModule { }
