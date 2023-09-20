import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from 'src/posts/posts.module';
import { Repost } from './entities/repost.entity';
import { RepostsService } from './reposts.service';
import { RepostsController } from './reposts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Repost]), forwardRef(() => PostsModule)],
  controllers: [RepostsController],
  providers: [RepostsService],
  exports: [RepostsService],
})
export class RepostsModule {}
