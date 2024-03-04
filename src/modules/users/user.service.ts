import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(data: CreateUserDto): Promise<User> {
    const findUser = await this.findOne({ email: data.email });
    if (findUser) {
      throw new BadRequestException('Email is exist');
    }
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(options = {}): Promise<User> {
    return this.userRepository.findOne({ where: options });
  }

  async getOne(id: number): Promise<User> {
    const findUser = await this.findOne({ id: id });
    if (!findUser) {
      throw new NotFoundException('Not found user');
    }
    return findUser;
  }

  async getUserWithRoleAndPermisson(id: number): Promise<User> {
    return this.userRepository.findOne({
      relations: { roles: { permissions: true } },
      where: { id: id },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const findUser = await this.findOne({ id: id });
    if (!findUser) {
      throw new NotFoundException('Not found user');
    }
    for (const [key, value] of Object.entries(data)) {
      findUser[key] = value;
    }
    return this.userRepository.save(findUser);
  }

  async remove(id: number): Promise<void> {
    const deleteRes = await this.userRepository.softDelete(id);
    if (!deleteRes.affected) {
      throw new NotFoundException('Not found user');
    }
  }

  async restore(id: number): Promise<void> {
    const restoreRes = await this.userRepository.restore(id);
    if (!restoreRes.affected) {
      throw new NotFoundException('Not found user');
    }
  }
}
