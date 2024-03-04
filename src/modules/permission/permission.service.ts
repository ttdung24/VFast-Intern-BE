import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissonDto } from './dto/create-permisson.dto';
import { UpdatePermissonDto } from './dto/update-permisson.dto';
import { In, Repository } from 'typeorm';
import { Permisson } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateParams, IResponseList } from 'src/share/common/app.interface';
import { SortOrderEnum } from 'src/share/common/app.enum';

@Injectable()
export class PermissonService {
  constructor(
    @InjectRepository(Permisson)
    private readonly permissonRepository: Repository<Permisson>,
  ) {}
  async create(data: CreatePermissonDto): Promise<Permisson> {
    const findPermisson = await this.permissonRepository.findOneBy({
      code: data.code,
    });
    if (findPermisson) {
      throw new ConflictException('Code already exist');
    }
    const newPermisson = this.permissonRepository.create(data);
    return this.permissonRepository.save(newPermisson);
  }

  async getListPermisson(
    params: IPaginateParams,
  ): Promise<IResponseList<Permisson>> {
    const page = params.page ? params.page : 1;
    const pageSize = params.pageSize ? params.pageSize : 10;
    const sortBy = params.sortBy
      ? `permisson.${params.sortBy}`
      : `permisson.created_at`;
    const sortOrder =
      params.sortOrder === SortOrderEnum.ASC
        ? SortOrderEnum.ASC
        : SortOrderEnum.DESC;
    let query = this.permissonRepository
      .createQueryBuilder('permisson')
      .select(['id', 'code', 'module', 'created_at', 'updated_at']);
    if (params.search) {
      query = query.andWhere('permisson.code LIKE :code', {
        code: '%' + params.search + '%',
      });
    }
    const [data, total] = await Promise.all([
      query
        .orderBy(sortBy, sortOrder)
        .offset((page - 1) * pageSize)
        .limit(pageSize)
        .getRawMany(),
      query.getCount(),
    ]);
    const totalPage =
      total % pageSize === 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1;
    return {
      data,
      total,
      page,
      pageSize,
      totalPage,
    };
  }

  getPermissonById(id: number): Promise<Permisson> {
    return this.permissonRepository.findOneBy({ id: id });
  }

  async update(id: number, data: UpdatePermissonDto): Promise<Permisson> {
    const findPermisson = await this.permissonRepository.findOneBy({ id: id });
    if (!findPermisson) {
      throw new NotFoundException('Not found permisson');
    }
    for (const [key, value] of Object.entries(data)) {
      findPermisson[key] = value;
    }
    return this.permissonRepository.save(findPermisson);
  }

  async remove(id: number): Promise<void> {
    const deleteRes = await this.permissonRepository.softDelete(id);
    if (!deleteRes.affected) {
      throw new NotFoundException('Not found permisson');
    }
  }

  async restore(id: number): Promise<void> {
    const restoreRes = await this.permissonRepository.restore(id);
    if (!restoreRes.affected) {
      throw new NotFoundException('Not found permisson');
    }
  }

  getOneByCondition(option = {}): Promise<Permisson> {
    return this.permissonRepository.findOne({ where: option });
  }

  getListPermissonByIds(ids: number[]): Promise<Permisson[]> {
    return this.permissonRepository.find({
      where: { id: In(ids) },
      withDeleted: true,
    });
  }
}
