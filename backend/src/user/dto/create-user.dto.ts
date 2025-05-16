import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @ApiProperty({
    example: 'jD2j2@example.com',
    description: 'User email',
    required: true,
    uniqueItems: true,
  })
  public readonly email: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 20, { message: 'Name must be between 3 and 20 characters' })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'John',
    description: 'User name',
    required: true,
  })
  public readonly name: string;

  @IsNotEmpty({ message: 'Surname is required' })
  @IsString({ message: 'Surname must be a string' })
  @Length(2, 20, { message: 'Surname must be between 3 and 20 characters' })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Williams',
    description: 'User surname',
    required: true,
  })
  surname: string;
}
