import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddDislikeDto {
  @ApiProperty()
  @IsNumber()
  readonly postId: number;
}
