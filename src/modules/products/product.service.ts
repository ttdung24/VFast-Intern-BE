import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortOrderEnum } from 'src/share/common/app.enum';
import { IPaginateParams, IResponseList } from 'src/share/common/app.interface';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    const findProduct = await this.getOneByCondition({ name: data.name });
    if (findProduct) {
      throw new BadRequestException('Name is exist');
    }
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }

  async getListProduct(
    params: IPaginateParams,
  ): Promise<IResponseList<Product>> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const pageSize =
      params.pageSize && params.pageSize > 0 ? params.pageSize : 10;
    const sortBy = params.sortBy
      ? `product.${params.sortBy}`
      : `product.created_at`;

    const sortOrder =
      params.sortOrder === SortOrderEnum.ASC
        ? SortOrderEnum.ASC
        : SortOrderEnum.DESC;
    let query = this.productRepository
      .createQueryBuilder('product')
      .select([
        'id',
        'name',
        'description',
        'price',
        'product.created_at as "createdAt"',
        'product.updated_at as "updatedAt"',
      ]);
    if (params.search) {
      query = query.andWhere('product.name LIKE :name', {
        name: '%' + params.search + '%',
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

  getProductById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id: id });
  }

  getOneByCondition(options = {}): Promise<Product> {
    return this.productRepository.findOne({ where: options });
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const findProduct = await this.getOneByCondition({ id: id });
    if (!findProduct) {
      throw new NotFoundException('Not found product');
    }
    for (const [key, value] of Object.entries(data)) {
      findProduct[key] = value;
    }
    return this.productRepository.save(findProduct);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
