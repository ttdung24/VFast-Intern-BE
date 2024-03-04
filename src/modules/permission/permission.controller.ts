import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  Query,
} from '@nestjs/common';
import { PermissonService } from './permission.service';
import { CreatePermissonDto } from './dto/create-permisson.dto';
import { UpdatePermissonDto } from './dto/update-permisson.dto';
import { ApiTags } from '@nestjs/swagger';
import { Permisson } from './permission.entity';
import { QueryParamDto } from 'src/share/dto/query-param.dto';
import { IResponseList } from 'src/share/common/app.interface';
import { Permissions } from 'src/share/decorators/permissons.decorator';
import { PermissonEnum } from 'src/share/common/app.enum';

@Controller('permissons')
@ApiTags('Permisson')
export class PermissonController {
  constructor(private readonly permissonService: PermissonService) {}

  @Permissions(PermissonEnum.PERMISSION_CREATE)
  @Post()
  @HttpCode(201)
  async create(@Body() data: CreatePermissonDto) {
    return this.permissonService.create(data);
  }

  @Get()
  @HttpCode(200)
  getListPermisson(
    @Query() query: QueryParamDto,
  ): Promise<IResponseList<Permisson>> {
    return this.permissonService.getListPermisson(query);
  }

  @Get(':id')
  @HttpCode(200)
  getPermissonById(@Param('id', ParseIntPipe) id: number) {
    return this.permissonService.getPermissonById(id);
  }

  @Patch(':id')
  @HttpCode(201)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePermissonDto,
  ): Promise<Permisson> {
    return this.permissonService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.permissonService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.permissonService.restore(id);
  }
}
