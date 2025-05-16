import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class QueryUserDto {
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
  //   example: 'name',
  //   description: 'Поле для пошуку (наприклад: name, email, phone)',
  // })
  field?: string;
}
