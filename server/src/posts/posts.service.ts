import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostStatsService } from 'src/postStats/postStats.service';
import { generatePeriodFilter } from 'src/utils/generatePeriodFilter';
import { formatTags } from 'src/utils/formatTags';
import { UsersService } from 'src/users/users.service';

const periodFilters = ['today', 'week', 'month', 'year', 'allTime'];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
    private postStatsService: PostStatsService,
    private userService: UsersService,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    const { id } = await this.repository.save({
      ...createPostDto,
      tags: formatTags(createPostDto?.tags),
      user: { id: userId },
    });

    this.postStatsService.create(id);
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async popular(period: string) {
    if (!periodFilters.includes(period)) {
      throw new NotFoundException('uknown_period');
    }

    const periodFilter = generatePeriodFilter(period);

    const posts = this.postStatsService.popular(periodFilter);

    return posts;
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.repository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('no_post');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('no_access');
    }

    return this.repository.update(id, updatePostDto);
  }

  async remove(id: number, userId: number) {
    const post = await this.repository.findOne({ where: { id } });

    const user = await this.userService.findById(userId);

    if (!post) {
      throw new NotFoundException('no_post');
    }

    if (post.user.id === userId || user.role.id === 3) {
      return this.repository.delete(id);
    }

    throw new ForbiddenException('no_access');
  }
}
