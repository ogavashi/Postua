import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddRepostDto {
  @ApiProperty()
  @IsNumber()
  readonly postId: number;
}
