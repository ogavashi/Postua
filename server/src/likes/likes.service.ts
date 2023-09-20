/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { PostsService } from 'src/posts/posts.service';
import { PostStatsService } from 'src/postStats/postStats.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private repository: Repository<Like>,
    @Inject(forwardRef(() => PostStatsService))
    private postStatsService: PostStatsService,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  async like(postId: number, userId: number) {
    const post = await this.postsService.findOne(postId);

    if (!post) {
      throw new NotFoundException('no_post');
    }

    const postStats = await this.postStatsService.findOne(post.id);

    const liked = await this.repository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (liked) {
      postStats.likes = postStats.likes - 1;
      await this.postStatsService.update(postStats.id, postStats);

      return this.remove(liked.id);
    }

    const newLike = { post: { id: postId }, user: { id: userId } };
    postStats.likes = postStats.likes + 1;
    await this.postStatsService.update(postStats.id, postStats);

    return this.repository.save(newLike);
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
