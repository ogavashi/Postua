/* eslint-disable @typescript-eslint/no-unused-vars */
import { Get, Query, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { PostsService } from 'src/posts/posts.service';
import { PostStatsService } from 'src/postStats/postStats.service';
import { UsersService } from 'src/users/users.service';
import { UserId } from 'src/decorators/user-id.decorator';

@Injectable()
export class SearchService {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  async search(search: string, userId?: number) {
    const posts = await this.postsService.search(search, userId);

    const users = await this.usersService.search(search);

    return [...posts, ...users];
  }
}