import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(8)
  readonly password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsOptional()
  readonly avatarUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsOptional()
  readonly backgroundUrl?: string;
}
