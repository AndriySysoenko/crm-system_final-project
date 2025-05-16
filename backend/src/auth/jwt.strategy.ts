import { BadRequestException, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

const redis = new Redis();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(payload: {
    userId: string;
    email: string;
    role: string;
  }) {
    const user = await this.userService.findOneById(payload.userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const storedToken = await redis.get(`user:${payload.userId}`);
    if (!storedToken) {
      throw new BadRequestException('Invalid token or expired token');
    }

    return {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }
}
