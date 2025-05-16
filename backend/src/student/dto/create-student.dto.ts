import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEmail,
  Min,
  Max,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Maxim', description: 'Student name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Maximt', description: 'Student surname' })
  @IsString()
  surname: string;

  @ApiProperty({
    example: 'Misteri8686@gmail.com',
    description: 'Student email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '389659654', description: 'Student phone' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 21, description: 'Student age' })
  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;

  @ApiProperty({ example: 'QACX', description: 'Student course' })
  @IsString()
  course: string;

  @ApiProperty({ example: 'static', description: 'Course format' })
  @IsString()
  course_format: string;

  @ApiProperty({ example: 'pro', description: 'Type of course' })
  @IsString()
  course_type: string;

  @ApiProperty({ example: null, description: 'Сума до сплати', nullable: true })
  @IsOptional()
  @IsNumber()
  sum?: number;

  @ApiProperty({
    example: null,
    description: 'Оплачено заздалегідь',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  already_paid?: number;

  @ApiProperty({ example: '', description: 'UTM мітка', nullable: true })
  @IsOptional()
  @IsString()
  utm?: string;

  @ApiProperty({ example: null, description: 'Повідомлення', nullable: true })
  @IsOptional()
  @IsString()
  msg?: string;

  @ApiProperty({ example: null, description: 'Статус', nullable: true })
  @IsOptional()
  @IsString()
  status?: string;
}
