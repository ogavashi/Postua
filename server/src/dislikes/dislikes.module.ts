import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { PostStatsModule } from 'src/postStats/postStats.module';
import { Dislike } from './entities/dislike.entity';
import { DislikesController } from './dislikes.controller';
import { DislikesService } from './dislikes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dislike]),
    forwardRef(() => PostStatsModule),
    forwardRef(() => PostsModule),
  ],
  controllers: [DislikesController],
  providers: [DislikesService],
  exports: [DislikesService],
})
export class DislikesModule {}
