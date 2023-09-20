import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddSavedDto {
  @ApiProperty()
  @IsNumber()
  readonly postId: number;
}
