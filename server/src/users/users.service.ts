/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/hashPassword';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findById(id: number) {
    const { password, ...user } = await this.repository.findOneBy({ id });

    return user;
  }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('email_registred');
    }

    const password = await hashPassword(dto.password);

    return this.repository.save({ ...dto, password });
  }
}
