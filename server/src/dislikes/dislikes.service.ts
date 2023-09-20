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
import { Dislike } from './entities/dislike.entity';

@Injectable()
export class DislikesService {
  constructor(
    @InjectRepository(Dislike)
    private repository: Repository<Dislike>,
    @Inject(forwardRef(() => PostStatsService))
    private postStatsService: PostStatsService,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  async dislike(postId: number, userId: number) {
    const post = await this.postsService.findOne(postId);

    if (!post) {
      throw new NotFoundException('no_post');
    }

    if (post.user.id === userId) {
      throw new ConflictException('self_dislike');
    }

    const postStats = await this.postStatsService.findOne(post.id);

    const disliked = await this.repository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (disliked) {
      postStats.dislikes = postStats.dislikes - 1;
      await this.postStatsService.update(postStats.id, postStats);

      return this.remove(disliked.id);
    }

    const newDislike = { post: { id: postId }, user: { id: userId } };
    postStats.dislikes = postStats.dislikes + 1;
    await this.postStatsService.update(postStats.id, postStats);

    return this.repository.save(newDislike);
  }

  async findByUserAndPost(userId: number, postId: number) {
    const disliked = await this.repository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });

    return !!disliked;
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
