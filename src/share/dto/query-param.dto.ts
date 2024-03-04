import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrderEnum } from 'src/share/common/app.enum';

export class QueryParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageSize: number = 10;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  sortBy: string = 'created_at';

  @ApiPropertyOptional()
  @IsEnum(SortOrderEnum)
  @IsOptional()
  sortOrder: SortOrderEnum = SortOrderEnum.DESC;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  search: string;
}
