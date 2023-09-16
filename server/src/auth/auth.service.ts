/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto);

      const { password, ...user } = userData;

      return {
        ...user,
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (error) {
      throw new ForbiddenException(
        `Could not register user. ${error.message}.`,
      );
    }
  }

  async login(user: User) {
    return {
      ...user,
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
