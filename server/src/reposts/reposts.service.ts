/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsService } from 'src/posts/posts.service';
import { PostStatsService } from 'src/postStats/postStats.service';
import { Repost } from './entities/repost.entity';

@Injectable()
export class RepostsService {
  constructor(
    @InjectRepository(Repost)
    private repository: Repository<Repost>,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  async repost(postId: number, userId: number) {
    const post = await this.postsService.findOne(postId);

    if (!post) {
      throw new NotFoundException('no_post');
    }

    if (post.user.id === userId) {
      throw new ConflictException('self_repost');
    }

    const reposted = await this.repository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (reposted) {
      return this.remove(reposted.id);
    }

    const newRepost = { post: { id: postId }, user: { id: userId } };

    return this.repository.save(newRepost);
  }

  async findByUserAndPost(userId: number, postId: number) {
    const reposted = await this.repository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });

    return !!reposted;
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
