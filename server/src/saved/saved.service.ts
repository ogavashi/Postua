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
import { Saved } from './entities/saved.entity';
import { PageOptionsDto } from 'src/page/dto/page-options.dto';

@Injectable()
export class SavedService {
  constructor(
    @InjectRepository(Saved)
    private repository: Repository<Saved>,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  async save(postId: number, userId: number) {
    const post = await this.postsService.findOne(postId);

    if (!post) {
      throw new NotFoundException('no_post');
    }

    const saved = await this.repository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (saved) {
      return this.remove(saved.id);
    }

    const newSave = { post: { id: postId }, user: { id: userId } };

    return this.repository.save(newSave);
  }

  async findByUserAndPost(userId: number, postId: number) {
    const reposted = await this.repository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });

    return !!reposted;
  }

  async findAll(pageOptions: PageOptionsDto, id: number, category?: string) {
    const skip = (pageOptions.page - 1) * pageOptions.take;

    const where = category
      ? { user: { id }, post: { category } }
      : { user: { id } };

    const saved = await this.repository.find({
      where,
      skip: skip,
      take: pageOptions.take,
    });

    const posts = saved.map(({ post }) => {
      const { password, ...userData } = post.user;

      return {
        ...post,
        user: userData,
      };
    });

    const count = await this.repository.count({ where: { user: { id } } });

    return { data: posts, count };
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
