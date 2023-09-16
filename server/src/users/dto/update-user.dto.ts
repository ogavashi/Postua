import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly avatarUrl: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly backgroundUrl: string;
}
