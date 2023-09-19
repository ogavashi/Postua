/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostStats } from './entities/postStats.entity';
import { Repository } from 'typeorm';
import { extractTags } from 'src/utils/extractTags';

@Injectable()
export class PostStatsService {
  constructor(
    @InjectRepository(PostStats)
    private repository: Repository<PostStats>,
  ) {}

  async create(postId: number) {
    const statsItem = await this.repository.create({ post: { id: postId } });

    this.repository.save(statsItem);
  }

  async popular(filter: any) {
    const items = await this.repository.find({
      where: { post: filter },
      order: { likes: 'DESC', views: 'DESC' },
    });

    const posts = items.map(({ post, id, ...stats }) => {
      const { password, ...userData } = post.user;

      return {
        ...post,
        tags: post?.tags ? extractTags(post.tags) : null,
        user: userData,
        stats,
      };
    });

    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
