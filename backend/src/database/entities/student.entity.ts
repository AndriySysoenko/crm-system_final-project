import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class StudentEntity {
  @ApiProperty({ example: 'Maxim', description: 'Student name' })
  @Prop({ required: false })
  name: string | null;

  @ApiProperty({ example: 'Maximt', description: 'Фамилия пользователя' })
  @Prop({ required: false, default: null })
  surname: string;

  @ApiProperty({
    example: 'Misteri8686@gmail.com',
    description: 'Email пользователя',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @Prop({ required: false, default: null })
  email: string | null;

  @ApiProperty({ example: '389659654', description: 'Телефон пользователя' })
  @Prop({ required: false, default: null })
  phone: string | null;

  @ApiProperty({ example: 21, description: 'Возраст пользователя' })
  @Prop({ required: false, default: null })
  age: number | null;

  @ApiProperty({ example: 'QACX', description: 'Курс пользователя' })
  @Prop({ required: false, default: null })
  course: string | null;

  @ApiProperty({ example: 'static', description: 'Формат курса' })
  @Prop({ required: false, default: null })
  course_format: string | null;

  @ApiProperty({ example: 'pro', description: 'Тип курса' })
  @Prop({ required: false, default: null })
  course_type: string | null;

  @ApiProperty({ example: null, description: 'Сумма оплаты', nullable: true })
  @Prop({ default: null })
  sum: number | null;

  @ApiProperty({
    example: null,
    description: 'Оплачено заранее',
    nullable: true,
  })
  @Prop({ default: null })
  already_paid: number | null;

  @ApiProperty({
    example: '2021-11-01T19:56:37Z',
    description: 'Дата создания',
  })
  @Prop({ default: Date.now })
  created_at: Date;

  @ApiProperty({ example: '', description: 'UTM метка', nullable: true })
  @Prop({ default: '' })
  utm: string | null;

  @ApiProperty({ example: null, description: 'Сообщение', nullable: true })
  @Prop({ default: null })
  msg: string | null;

  @ApiProperty({ example: null, description: 'Статус', nullable: true })
  @Prop({ default: null })
  status: string | null;
}

export const StudentSchema = SchemaFactory.createForClass(StudentEntity);
