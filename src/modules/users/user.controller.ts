import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissonEnum } from 'src/share/common/app.enum';
import { Permissions } from 'src/share/decorators/permissons.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permissions(PermissonEnum.USER_CREATE)
  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Permissions(PermissonEnum.USER_VIEW)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getOne(id);
  }

  @Get('role/:id')
  async getUserWithRole(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserWithRoleAndPermisson(id);
  }

  @Permissions(PermissonEnum.USER_UPDATE)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Permissions(PermissonEnum.USER_DELETE)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
