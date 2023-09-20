import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { RoleDto } from 'src/roles/dto/role.dto';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

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
  readonly memberFrom: string;

  @ApiProperty()
  readonly role: RoleDto;
}
