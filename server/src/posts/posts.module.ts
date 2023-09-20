import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostStatsModule } from 'src/postStats/postStats.module';
import { UsersModule } from 'src/users/users.module';
import { LikesModule } from 'src/likes/likes.module';
import { DislikesModule } from 'src/dislikes/dislikes.module';
import { SavedModule } from 'src/saved/saved.module';
import { SubsModule } from 'src/subs/subs.module';

@Module({
  imports: [
    PostStatsModule,
    UsersModule,
    SubsModule,
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => LikesModule),
    forwardRef(() => DislikesModule),
    forwardRef(() => SavedModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
