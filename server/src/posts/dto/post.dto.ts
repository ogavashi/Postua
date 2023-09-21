import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { OutputBlockData } from './create-post.dto';
import { PostStatsDto } from 'src/postStats/dto/postStats.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class PostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  body: OutputBlockData[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  stats: PostStatsDto;
}
