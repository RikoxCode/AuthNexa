import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IsArray, isArray } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: any = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User with this username not found');
    }

    if (user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid user');
  }

  async validateUserById(userId: string): Promise<any> {
    const user = await this.userService.findOneById(userId);

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid user');
  }

  async setToken(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }

  async login(user: any) {
    user = await this.validateUser(user.username, user.password);

    return this.setToken(user);
  }

  async register(user: any) {
    user = await this.userService.create(user);

    return this.setToken(user);
  }

  async getProfile(user: any) {
    user = await this.validateUser(user.username, user.password);

    return user;
  }
}
