import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from 'src/posts/posts.module';
import { SavedController } from './saved.controller';
import { SavedService } from './saved.service';
import { Saved } from './entities/saved.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Saved]), forwardRef(() => PostsModule)],
  controllers: [SavedController],
  providers: [SavedService],
  exports: [SavedService],
})
export class SavedModule {}
