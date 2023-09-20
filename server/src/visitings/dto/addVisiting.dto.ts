import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddVisitingDto {
  @ApiProperty()
  @IsNumber()
  readonly postId: number;
}
