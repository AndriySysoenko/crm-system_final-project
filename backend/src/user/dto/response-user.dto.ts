import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @ApiProperty({ example: '1a2b3c', description: 'User ID' })
  @Expose({ name: '_id' })
  public readonly id: string;

  @ApiProperty({
    example: 'jD2j2@example.com',
    description: 'User email',
  })
  @Expose()
  public readonly email: string;

  @ApiProperty({
    example: 'John',
    description: 'User name',
  })
  @Expose()
  public readonly name: string;

  @ApiProperty({
    example: 'Williams',
    description: 'User surname',
  })
  @Expose()
  surname: string;

  @ApiProperty()
  @Expose()
  is_active: boolean;

  @ApiProperty()
  @Expose()
  last_login?: Date;

  @ApiProperty()
  @Expose()
  created_at?: Date;
}
