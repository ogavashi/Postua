import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginDto } from './dto/login.dto';
import { UserDto } from 'src/users/dto/user.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: UserDto })
  async login(@Request() req) {
    return this.authService.login(req.user as User);
  }

  @Post('auth/register')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: UserDto })
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
