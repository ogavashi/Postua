import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostStatsService } from 'src/postStats/postStats.service';
import { generatePeriodFilter } from 'src/utils/generatePeriodFilter';
import { formatTags } from 'src/utils/formatTags';
import { UsersService } from 'src/users/users.service';
import { LikesService } from 'src/likes/likes.service';
import { DislikesService } from 'src/dislikes/dislikes.service';
import { SavedService } from 'src/saved/saved.service';
import { PageOptionsDto } from 'src/page/dto/page-options.dto';
import { PageDto } from 'src/page/dto/page.dto';
import { PageMetaDto } from 'src/page/dto/page-meta.dto';
import { SubsService } from 'src/subs/subs.service';
import { generateRatingFilter } from 'src/utils/generateRatingFilter';

const periodFilters = ['today', 'week', 'month', 'year', 'allTime'];

const ratingFilters = ['from-10', 'from5', 'from10', 'all'];

const CATEGORIES = ['games', 'music', 'tech', 'anime', 'cinema', 'software'];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
    private postStatsService: PostStatsService,
    private userService: UsersService,
    private subsService: SubsService,
    @Inject(forwardRef(() => LikesService))
    private likesService: LikesService,
    @Inject(forwardRef(() => DislikesService))
    private dislikesService: DislikesService,
    @Inject(forwardRef(() => SavedService))
    private savedService: SavedService,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    const { id } = await this.repository.save({
      ...createPostDto,
      tags: formatTags(createPostDto?.tags),
      user: { id: userId },
    });

    this.postStatsService.create(id);
  }

  async findAll(pageOptions: PageOptionsDto, userId?: number) {
    const { data: posts, count } =
      await this.postStatsService.getAll(pageOptions);

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });

    if (userId) {
      const formattedPosts = await Promise.all(
        posts.map(async (post) => ({
          ...post,
          isLiked: await this.likesService.findByUserAndPost(userId, post.id),
          isDisliked: await this.dislikesService.findByUserAndPost(
            userId,
            post.id,
          ),
          isSaved: await this.savedService.findByUserAndPost(userId, post.id),
          isSubscribed: await this.subsService.findByUserAndCategory(
            userId,
            post.category,
          ),
        })),
      );

      return new PageDto(formattedPosts, pageMetaDto);
    }

    return new PageDto(posts, pageMetaDto);
  }

  async popular(pageOptions: PageOptionsDto, period: string, userId?: number) {
    if (!periodFilters.includes(period)) {
      throw new NotFoundException('uknown_period');
    }

    const periodFilter = generatePeriodFilter(period);

    const { data: posts, count } = await this.postStatsService.popular(
      periodFilter,
      pageOptions,
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });

    if (userId) {
      const formattedPosts = await Promise.all(
        posts.map(async (post) => ({
          ...post,
          isLiked: await this.likesService.findByUserAndPost(userId, post.id),
          isDisliked: await this.dislikesService.findByUserAndPost(
            userId,
            post.id,
          ),
          isSaved: await this.savedService.findByUserAndPost(userId, post.id),
          isSubscribed: await this.subsService.findByUserAndCategory(
            userId,
            post.category,
          ),
        })),
      );

      return new PageDto(formattedPosts, pageMetaDto);
    }

    return new PageDto(posts, pageMetaDto);
  }

  async fresh(pageOptions: PageOptionsDto, rating: string, userId?: number) {
    if (!ratingFilters.includes(rating)) {
      throw new NotFoundException('uknown_rating');
    }

    const ratingFilter = generateRatingFilter(rating);

    const { data: posts, count } = await this.postStatsService.fresh(
      ratingFilter,
      pageOptions,
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });

    if (userId) {
      const formattedPosts = await Promise.all(
        posts.map(async (post) => ({
          ...post,
          isLiked: await this.likesService.findByUserAndPost(userId, post.id),
          isDisliked: await this.dislikesService.findByUserAndPost(
            userId,
            post.id,
          ),
          isSaved: await this.savedService.findByUserAndPost(userId, post.id),
          isSubscribed: await this.subsService.findByUserAndCategory(
            userId,
            post.category,
          ),
        })),
      );

      return new PageDto(formattedPosts, pageMetaDto);
    }

    return new PageDto(posts, pageMetaDto);
  }

  async saved(pageOptions: PageOptionsDto, userId: number, category?: string) {
    if (category && !CATEGORIES.includes(category)) {
      throw new NotFoundException('no_category');
    }

    const { data: posts, count } = await this.savedService.findAll(
      pageOptions,
      userId,
      category,
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });

    const formattedPosts = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        stats: (await this.postStatsService.getOne(post.id)).stats,
        isLiked: await this.likesService.findByUserAndPost(userId, post.id),
        isDisliked: await this.dislikesService.findByUserAndPost(
          userId,
          post.id,
        ),
        isSaved: await this.savedService.findByUserAndPost(userId, post.id),
        isSubscribed: await this.subsService.findByUserAndCategory(
          userId,
          post.category,
        ),
      })),
    );

    return new PageDto(formattedPosts, pageMetaDto);
  }

  async userProfile(
    pageOptions: PageOptionsDto,
    userId: number,
    senderId?: number,
  ) {
    const { data: posts, count } = await this.postStatsService.getAll(
      pageOptions,
      {
        post: { user: { id: userId } },
      },
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });

    if (senderId) {
      const formattedPosts = await Promise.all(
        posts.map(async (post) => ({
          ...post,
          isLiked: await this.likesService.findByUserAndPost(senderId, post.id),
          isDisliked: await this.dislikesService.findByUserAndPost(
            userId,
            post.id,
          ),
          isSaved: await this.savedService.findByUserAndPost(senderId, post.id),
          isSubscribed: await this.subsService.findByUserAndCategory(
            userId,
            post.category,
          ),
        })),
      );
      return new PageDto(formattedPosts, pageMetaDto);
    }

    return new PageDto(posts, pageMetaDto);
  }

  async findOne(id: number, userId?: number) {
    const post = await this.postStatsService.getOne(id);

    if (!post) {
      throw new NotFoundException('no_post');
    }

    if (userId) {
      return {
        ...post,
        isLiked: await this.likesService.findByUserAndPost(userId, post.id),
        isDisliked: await this.dislikesService.findByUserAndPost(
          userId,
          post.id,
        ),
        isSaved: await this.savedService.findByUserAndPost(userId, post.id),
      };
    }

    return post;
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

  async search(search: string, userId?: number) {
    const posts = await this.postStatsService.search([
      {
        post: {
          title: Like(`%${search}%`),
        },
      },
      {
        post: { user: { fullName: Like(`%${search}%`) } },
      },
      {
        post: { tags: Like(`%${search}%`) },
      },
      {
        post: {
          category: Like(`%${search}%`),
        },
      },
    ]);

    if (userId) {
      const result = await Promise.all(
        posts.map(async (post) => ({
          ...post,
          type: 'post',
          isLiked: await this.likesService.findByUserAndPost(userId, post.id),
          isDisliked: await this.dislikesService.findByUserAndPost(
            userId,
            post.id,
          ),
          isSaved: await this.savedService.findByUserAndPost(userId, post.id),
          isSubscribed: await this.subsService.findByUserAndCategory(
            userId,
            post.category,
          ),
        })),
      );

      return result;
    }

    return posts;
  }

  async getByCategory(
    pageOptions: PageOptionsDto,
    category: string,
    userId?: number,
  ) {
    const { data: posts, count } = await this.postStatsService.getByCategory(
      category,
      pageOptions,
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });

    if (userId) {
      const result = await Promise.all(
        posts.map(async (post) => ({
          ...post,
          type: 'post',
          isLiked: await this.likesService.findByUserAndPost(userId, post.id),
          isDisliked: await this.dislikesService.findByUserAndPost(
            userId,
            post.id,
          ),
          isSaved: await this.savedService.findByUserAndPost(userId, post.id),
          isSubscribed: await this.subsService.findByUserAndCategory(
            userId,
            post.category,
          ),
        })),
      );

      return new PageDto(result, pageMetaDto);
    }

    return new PageDto(posts, pageMetaDto);
  }
}
