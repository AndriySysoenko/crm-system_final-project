import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { UserService } from '../user/user.service';
import { LoginReqDto } from './dto/login-user.req.dto';
import { UserDocument } from '../database/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const redis = new Redis();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userService.findOneByEmailWithPassword(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  public async generateActivationLink(
    email: string,
  ): Promise<{ activationLink: string }> {
    try {
      const user = await this.userService.findOneByEmail(email);
      const { accessToken } = await this.generateToken(
        user,
        1800,
        'activation',
      );

      const activationLink = `http://localhost:3000/activation/${accessToken}`;
      return { activationLink };
    } catch (error) {
      throw new UnauthorizedException('Activation failed');
    }
  }

  public async activateUser(token: string, password: string): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const redisToken = await redis.get(`activation:${payload.userId}`);
      if (!redisToken || redisToken !== token) {
        throw new UnauthorizedException('Activation token invalid or expired');
      }

      const user = await this.userService.findOneById(payload.userId);
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.is_active = true;
      await user.save();
    } catch (error) {
      throw new UnauthorizedException('Activation failed');
    }
  }

  public async login(loginDto: LoginReqDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      await this.userService.updateLastLogin(user._id.toString());
      return this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  public async generateToken(
    user: UserDocument,
    expiresIn: number = 1800,
    redisPrefix: 'activation' | 'user' = 'user',
  ): Promise<{ accessToken: string }> {
    const payload = { userId: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: expiresIn });
    await redis.set(`${redisPrefix}:${user._id}`, token, 'EX', expiresIn);
    return { accessToken: token };
  }

  public async logout(email: string): Promise<void> {
    try {
      const user = await this.userService.findOneByEmail(email);
      await redis.del(`user:${user._id}`);
    } catch {
      throw new BadRequestException('Logout failed');
    }
  }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }
  //
  // findAll() {
  //   return `This action returns all auth`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  //
  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
