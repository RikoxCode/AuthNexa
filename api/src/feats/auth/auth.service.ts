import {
  Header,
  Headers,
  Injectable,
  Req,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user: any = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User with this username not found');
    }

    if (user._doc.password === pass) {
      const { password, ...result } = user._doc;
      user._doc = result;
      return user;
    }

    throw new UnauthorizedException('Invalid user');
  }

  async validateUserById(userId: string) {
    const user: any = await this.userService.findOneById(userId);

    if (user) {
      const { password, ...result } = user._doc;
      user._doc = result;
      return user;
    }

    throw new UnauthorizedException('Invalid user');
  }

  async extractUserFromToken(header: any) {
    if (header.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid token');
    }

    const token: any = header.split(' ')[1];
    return await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })
  }

  async setToken(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
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

  async getProfile(req: Request) {
    const authorizationHeader = req;

    if (!authorizationHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = await this.extractUserFromToken(authorizationHeader);

    try {
      const user = await this.validateUserById(token.sub);
      return user;
    } catch (error) {
      console.log(error)
      if(error.status !== 401){
        throw new Error('Something went wrong');
      }

      throw new UnauthorizedException('Invalid token');
    }
  }
}
