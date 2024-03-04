import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissonService } from '../permission/permission.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly permissonService: PermissonService,
  ) {}

  async create(data: CreateRoleDto): Promise<Role> {
    const findRole = await this.roleRepository.findOneBy({ code: data.code });
    if (findRole) {
      throw new ConflictException('Code already exist');
    }
    const permissions = await this.permissonService.getListPermissonByIds(
      data.permissions,
    );
    const newRole = this.roleRepository.create({
      ...data,
      permissions: permissions,
    });
    return this.roleRepository.save(newRole);
  }

  async getListRoleByIds(ids: number[]): Promise<Role[]> {
    return this.roleRepository.find({
      where: { id: In(ids) },
      withDeleted: true,
    });
  }

  async update(id: number, data: UpdateRoleDto): Promise<Role> {
    let findRole = await this.roleRepository.findOneBy({ id: id });
    if (!findRole) {
      throw new NotFoundException('Not found role');
    }
    for (const [key, value] of Object.entries(data)) {
      findRole[key] = value;
    }
    if (data?.permissions?.length > 0) {
      findRole = {
        ...findRole,
        permissions: await this.permissonService.getListPermissonByIds(
          data.permissions,
        ),
      };
    }
    return this.roleRepository.save(findRole);
  }
}
