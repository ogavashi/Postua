import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { PostStatsModule } from 'src/postStats/postStats.module';
import { VisitingsService } from './visitings.service';
import { Visit } from './entities/visit.entity';
import { VisitingsController } from './visitings.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit]),
    forwardRef(() => PostStatsModule),
    forwardRef(() => PostsModule),
  ],
  controllers: [VisitingsController],
  providers: [VisitingsService],
  exports: [VisitingsService],
})
export class VisitingsModule {}
