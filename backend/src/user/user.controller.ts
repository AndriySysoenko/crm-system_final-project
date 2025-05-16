import {
  Controller,
  // Get,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { Roles } from '../common/guads/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from '../common/guads/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../common/enum/role.enum';
import { QueryUserDto } from './dto/query-user.dto';
import { UserDocument } from '../database/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.ADMIN)
  @Post()
  public async createManager(
    @Body() dataUser: CreateUserDto,
  ): Promise<UserResponseDto> {
    const newUser = await this.userService.createManager(dataUser);
    return plainToInstance(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  public async findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
