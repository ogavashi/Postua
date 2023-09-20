/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/hashPassword';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private rolesService: RolesService,
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

    return this.repository.save({ ...dto, roleId: 1, password });
  }

  async toggleRole(senderId: number, userId: number) {
    const sender = await this.findById(senderId);

    if (!sender) {
      throw new NotFoundException('no_user');
    }

    if (sender.role.id !== 3) {
      throw new UnauthorizedException('no_access');
    }

    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('no_user');
    }

    user.role.id = user.role.id === 1 ? 2 : 1;

    this.repository.update(userId, user);
  }

  async setUserRole(senderId: number, userId: number, roleId: number) {
    const role = await this.rolesService.findOne(roleId);

    if (!role) {
      throw new NotFoundException('no_role');
    }

    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('no_user');
    }

    const sender = await this.findById(senderId);

    if (!sender) {
      throw new NotFoundException('no_user');
    }

    if (sender.role.id !== 3) {
      throw new UnauthorizedException('no_access');
    }

    user.role.id = roleId;

    this.repository.update(userId, user);
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
