import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ActivateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ndoew8rho8*GIUEFhpPer-i3h',
    description: 'Activation token',
    required: true,
  })
  public readonly activationToken: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must be at least 8 characters, contain one uppercase letter and one number',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'password',
    description: 'User password',
    required: true,
  })
  public readonly password: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must be at least 8 characters, contain one uppercase letter and one number',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    example: 'Confirm password',
    description: 'User may confirm password',
    required: true,
  })
  public readonly confirmPassword: string;
}
