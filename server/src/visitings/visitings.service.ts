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
import { Visit } from './entities/visit.entity';

@Injectable()
export class VisitingsService {
  constructor(
    @InjectRepository(Visit)
    private repository: Repository<Visit>,
    @Inject(forwardRef(() => PostStatsService))
    private postStatsService: PostStatsService,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  async visit(postId: number, userId: number) {
    const post = await this.postsService.findOne(postId);

    if (!post) {
      throw new NotFoundException('no_post');
    }

    if (post.user.id === userId) {
      return;
    }

    const postStats = await this.postStatsService.findOne(post.id);

    const visited = await this.repository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (visited) {
      return;
    }

    const newVisited = { post: { id: postId }, user: { id: userId } };

    postStats.visitings = postStats.visitings + 1;
    await this.postStatsService.update(postStats.id, postStats);

    return this.repository.save(newVisited);
  }

  async findByUserAndPost(userId: number, postId: number) {
    const liked = await this.repository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });

    return !!liked;
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
