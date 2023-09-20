import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PostsModule } from 'src/posts/posts.module';
import { PostStatsModule } from 'src/postStats/postStats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    forwardRef(() => PostStatsModule),
    forwardRef(() => PostsModule),
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
