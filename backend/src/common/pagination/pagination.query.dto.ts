import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ReqQueryDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  // @ApiPropertyOptional({
  //   example: 1,
  //   description: 'Номер сторінки (від 1)',
  // })
  // @IsNumber()
  page?: number;

  @ApiProperty({ required: false, default: 25 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  // @ApiPropertyOptional({
  //   example: 25,
  //   description: 'Кількість елементів на сторінці',
  // })
  limit?: number;

  @ApiProperty({ required: true, default: 'ASC' })
  @IsOptional()
  @IsOptional()
  @Matches(
    /^(-)?(id|name|surname|email|phone|age|course|course_format|course_type|status|sum|alreadyPaid|created_at)$/,
    {
      message:
        'sort must be one of the allowed fields (optionally prefixed with - for DESC)',
    },
  )
  // @ApiPropertyOptional({
  //   example: '-created_at',
  //   description:
  //     'Поле для сортування. Додай "-" для сортування DESC (наприклад: name, -email)',
  // })
  sort?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  // @ApiPropertyOptional({
  //   example: 'Іван',
  //   description: 'Пошуковий рядок',
  // })
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  // @ApiPropertyOptional({
  //   example: 'name',
  //   description: 'Поле для пошуку (наприклад: name, email, phone)',
  // })
  field?: string;

  @IsOptional()
  onlyMy?: string; // 'true'

  @IsOptional()
  status?: string;

  @IsOptional()
  course_type?: string;
}

export class ResQueryDto<T> {
  @ApiProperty({ type: 'number' })
  page: number;

  @ApiProperty({ type: 'number' })
  pages: number;

  @ApiProperty({ type: 'number' })
  limit: number;

  @ApiProperty({ type: 'number' })
  total: number;

  @IsArray()
  @ApiProperty({ type: 'array', items: { type: 'object' } })
  data: Partial<T>[];
}
