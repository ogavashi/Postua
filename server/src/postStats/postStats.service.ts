/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostStats } from './entities/postStats.entity';
import { LessThanOrEqual, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { extractTags } from 'src/utils/extractTags';
import { PostStatsDto } from './dto/postStats.dto';
import { LikesService } from 'src/likes/likes.service';
import { PageOptionsDto } from 'src/page/dto/page-options.dto';

@Injectable()
export class PostStatsService {
  constructor(
    @InjectRepository(PostStats)
    @Inject(forwardRef(() => LikesService))
    private repository: Repository<PostStats>,
  ) {}

  async create(postId: number) {
    const statsItem = await this.repository.create({ post: { id: postId } });

    this.repository.save(statsItem);
  }

  async getAll(pageOptions: PageOptionsDto, filter = {}) {
    const items = await this.repository.find({
      order: { post: { createdAt: 'DESC' } },
      where: filter,
      skip: pageOptions.skip,
      take: pageOptions.take,
    });

    const count = await this.repository.count({ where: filter });

    const posts = items.map(({ post, id, ...stats }) => {
      const { password, ...userData } = post.user;

      return {
        ...post,
        tags: post?.tags ? extractTags(post.tags) : null,
        user: userData,
        stats,
      };
    });

    return { data: posts, count };
  }

  async search(filter = {}) {
    const items = await this.repository.find({
      order: { post: { createdAt: 'DESC' } },
      where: filter,
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

  async popular(filter: any, pageOptions: PageOptionsDto) {
    const items = await this.repository.find({
      where: { post: filter },
      order: { likes: 'DESC', views: 'DESC' },
      skip: pageOptions.skip,
      take: pageOptions.take,
    });

    const count = await this.repository.count({ where: { post: filter } });

    const posts = items.map(({ post, id, ...stats }) => {
      const { password, ...userData } = post.user;

      return {
        ...post,
        tags: post?.tags ? extractTags(post.tags) : null,
        user: userData,
        stats,
      };
    });

    return { data: posts, count };
  }

  async fresh(filter: any, pageOptions: PageOptionsDto) {
    const items = await this.repository.find({
      where: filter,
      order: { post: { createdAt: 'DESC' } },
      skip: pageOptions.skip,
      take: pageOptions.take,
    });

    const count = await this.repository.count({ where: filter });

    const posts = items.map(({ post, id, ...stats }) => {
      const { password, ...userData } = post.user;

      return {
        ...post,
        tags: post?.tags ? extractTags(post.tags) : null,
        user: userData,
        stats,
      };
    });

    return { data: posts, count };
  }

  async getOne(id: number) {
    const data = await this.repository.findOne({ where: { post: { id } } });

    if (!data) {
      throw new NotFoundException('no_post');
    }

    const { post, id: statId, ...stats } = data;
    const { password, ...userData } = post.user;

    return {
      ...post,
      tags: post?.tags ? extractTags(post.tags) : null,
      user: userData,
      stats,
    };
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { post: { id } } });
  }

  update(id: number, dto: PostStatsDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
