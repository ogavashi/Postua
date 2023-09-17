import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';

export class AuthResponseDto {
  @ApiProperty()
  readonly user: UserDto;

  @ApiProperty()
  @IsString()
  readonly token: string;
}
