import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddViewDto {
  @ApiProperty()
  @IsNumber()
  readonly postId: number;
}
