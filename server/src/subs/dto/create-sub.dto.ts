import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubDto {
  @ApiProperty()
  @IsString()
  readonly category: string;
}
