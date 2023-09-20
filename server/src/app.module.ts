import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostStats } from './postStats/entities/postStats.entity';
import { Comment } from './comments/entities/comment.entity';
import { Like } from './likes/entities/like.entity';
import { Dislike } from './dislikes/entities/dislike.entity';
import { Saved } from './saved/entities/saved.entity';
import { Repost } from './reposts/entities/repost.entity';
import { Role } from './roles/entities/role.entity';
import { LikesModule } from './likes/likes.module';
import { RepostsModule } from './reposts/reposts.module';
import { SavedModule } from './saved/saved.module';
import { ViewsModule } from './views/views.module';
import { View } from './views/entities/view.entity';
import { VisitingsModule } from './visitings/visitings.module';
import { Visit } from './visitings/entities/visit.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Post,
        PostStats,
        Comment,
        Like,
        Dislike,
        Repost,
        Saved,
        Role,
        View,
        Visit,
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    LikesModule,
    RepostsModule,
    SavedModule,
    ViewsModule,
    VisitingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
