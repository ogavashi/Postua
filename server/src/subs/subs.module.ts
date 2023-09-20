import { Module } from '@nestjs/common';
import { SubsService } from './subs.service';
import { SubsController } from './subs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub } from './entities/sub.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sub]), UsersModule],
  controllers: [SubsController],
  providers: [SubsService],
  exports: [SubsService],
})
export class SubsModule {}
