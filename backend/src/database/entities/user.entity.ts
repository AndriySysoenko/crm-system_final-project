import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../common/enum/role.enum';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class UserEntity {
  // @ApiProperty({
  //   example: '1a2b3c',
  //   description: 'User ID',
  // })
  // @Prop()
  // _id?: string;

  @ApiProperty({
    example: 'Misteri8686@gmail.com',
    description: 'Email пользователя',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
    required: false,
  })
  @Prop({ required: false, select: false })
  password?: string;

  @ApiProperty({
    example: 'Maxim',
    description: 'Student name',
    required: true,
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'Maximt',
    description: 'Фамилия пользователя',
    required: true,
  })
  @Prop({ required: true })
  surname: string;

  @ApiProperty({
    example: true,
    description: 'Статус пользователя',
    default: false,
  })
  @Prop({ default: false })
  is_active: boolean;

  @ApiProperty({
    example: '2021-11-01T19:56:37Z',
    description: 'Дата последнего входа',
    required: false,
  })
  @Prop({ default: null, required: false })
  last_login?: Date;

  @ApiProperty({ example: 'manager', description: 'Роль пользователя' })
  @Prop({
    default: Role.MANAGER,
    required: true,
    enum: [Role.ADMIN, Role.MANAGER],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
