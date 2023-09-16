import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  readonly fullName: string;

  @ApiProperty()
  @IsString()
  readonly avatarUrl: string;

  @ApiProperty()
  @IsString()
  readonly backgroundUrl: string;

  @ApiProperty()
  @IsString()
  readonly token: string;
}
