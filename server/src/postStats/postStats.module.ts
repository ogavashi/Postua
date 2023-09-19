import { Module } from '@nestjs/common';
import { PostStatsService } from './postStats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStats } from './entities/postStats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostStats])],
  providers: [PostStatsService],
  exports: [PostStatsService],
})
export class PostStatsModule {}
