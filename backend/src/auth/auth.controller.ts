import {
  Controller,
  // Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Get,
  Req,
  Delete,
  Res,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login-user.req.dto';
import { ActivateUserDto } from '../user/dto/activate-user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/guads/role.decorator';
import { RoleGuard } from '../common/guads/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../common/enum/role.enum';
import { UserEntity } from '../database/entities/user.entity';
// import { CreateAuthDto } from './dto/login-user.req.dto';
// import { UpdateAuthDto } from './dto/login-user.res.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @Post('/login')
  async login(@Body() loginDto: LoginReqDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate activation link for user' })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.ADMIN)
  @Post('/generate-activation-link')
  async generateActivationLink(
    @Body() body: { email: string },
  ): Promise<{ activationLink: string }> {
    return this.authService.generateActivationLink(body.email);
  }

  @Post('/activate')
  async activate(
    @Body() activateUserDto: ActivateUserDto,
  ): Promise<{ massage: string }> {
    if (activateUserDto.password !== activateUserDto.confirmPassword) {
      throw new BadRequestException('Password not match');
    }
    await this.authService.activateUser(
      activateUserDto.activationToken,
      activateUserDto.password,
    );
    return { massage: 'User activated' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/validate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Перевірка валідності access токена' })
  @ApiResponse({ status: 200, description: 'Токен валідний' })
  @ApiResponse({ status: 401, description: 'Неавторизований доступ' })
  async validate(@Req() req: Request) {
    const user: Express.User = req.user;
    return { user, valid: true };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'End session. Logout' })
  @ApiOkResponse({
    schema: { example: { message: 'Logged out successfully' } },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/logout')
  public async logout(@Req() req: { user: UserEntity }, @Res() res: Response) {
    await this.authService.logout(req.user.email);
    // return { message: 'Logged out successfully' };
    return res.status(401).json({ message: 'Logged out' });
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
