/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/hashPassword';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findById(id: number) {
    return this.repository.findOneBy({ id });
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

  async update(id: number, dto: UpdateUserDto) {
    let updatedUser = { ...dto };

    if (updatedUser?.password) {
      const password = await hashPassword(updatedUser.password);
      updatedUser = { ...updatedUser, password };
    }

    return this.repository.update(id, updatedUser);
  }
}
