import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { MODELS } from 'src/libs/database/enum';
import { User, UserDocument } from 'src/libs/database/schemas/user.schema';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MODELS.USER_MODEL) private userModel: Model<UserDocument>,
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    try {
      const user = await this.userModel.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        username: user.username,
        sub: user._id,
        permissions: user.permissions,
      };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      await this.redisService.set(
        `refreshToken:${user._id}`,
        refreshToken,
        60 * 60 * 24 * 7,
      );

      return {
        accessToken,
        refreshToken,
        user: {
          name: user.username,
          permissions: user.permissions,
        },
      };
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);

    if (!payload || payload.exp < Date.now() / 1000) {
      throw new UnauthorizedException('Expired refresh token');
    }

    const storedToken = await this.redisService.get(
      `refreshToken:${payload.sub}`,
    );
    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = this.jwtService.sign({
      username: payload.username,
      sub: payload.sub,
      permission: payload.permission,
    });
    return { accessToken: newAccessToken };
  }
}
