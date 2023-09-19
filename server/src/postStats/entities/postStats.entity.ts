import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('postStats')
export class PostStats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  likes: number = 0;

  @Column()
  dislikes: number = 0;

  @Column()
  comments: number = 0;

  @Column()
  views: number = 0;

  @Column()
  visitings: number = 0;

  @OneToOne(() => Post, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  post: Post;
}
