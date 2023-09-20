import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { PostStatsModule } from 'src/postStats/postStats.module';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { View } from './entities/view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([View]),
    forwardRef(() => PostStatsModule),
    forwardRef(() => PostsModule),
  ],
  controllers: [ViewsController],
  providers: [ViewsService],
  exports: [ViewsService],
})
export class ViewsModule {}
