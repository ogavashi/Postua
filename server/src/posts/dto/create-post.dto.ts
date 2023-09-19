import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { CategoryDto } from './category.dto';

export interface OutputBlockData {
  id?: string;
  type: any;
  data: any;
}

export type Category = {
  icon: string;
  key: string;
  backgroundUrl: string;
};

export class CreatePostDto {
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
  category: CategoryDto;
}
