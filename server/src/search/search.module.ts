import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [PostsModule, UsersModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
