import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { Permissions } from 'src/share/decorators/permissons.decorator';
import { PermissonEnum } from 'src/share/common/app.enum';

@Controller('roles')
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permissions(PermissonEnum.ROLE_CREATE)
  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateRoleDto): Promise<Role> {
    return this.roleService.create(data);
  }

  @Permissions(PermissonEnum.ROLE_UPDATE)
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRoleDto,
  ) {
    return this.roleService.update(id, data);
  }
}
