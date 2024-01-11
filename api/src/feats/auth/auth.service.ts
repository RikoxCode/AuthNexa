import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * This function is used to validate the user
   * @param username
   * @param pass
   * @returns
   */
  async validateUser(username: string, pass: string) {
    const user: any = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User with this username not found');
    }

    if (user._doc.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user._doc;
      user._doc = result;
      return user;
    }

    throw new UnauthorizedException('Invalid user');
  }

  /**
   * This function is used to validate the user by id
   * @param userId
   * @returns
   */
  async validateUserById(userId: string) {
    const user: any = await this.userService.findOneById(userId);

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user._doc;
      user._doc = result;
      return user;
    }

    throw new UnauthorizedException('Invalid user');
  }

  /**
   * This function is used to extract the user from the token
   * @param header
   * @returns
   */
  async extractUserFromToken(header: any) {
    if (header.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid token');
    }

    const token: any = header.split(' ')[1];
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  /**
   * This function is used to set the token
   * @param user
   * @returns
   */
  async setToken(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  /**
   * This function is used to login a user
   * @param user
   * @returns
   */
  async login(user: any) {
    user = await this.validateUser(user.username, user.password);

    return this.setToken(user);
  }

  /**
   * This function is used to register a new user
   * @param user
   * @returns
   */
  async register(user: any) {
    user = await this.userService.create(user);

    return this.setToken(user);
  }

  /**
   * This function returns the profile of the user
   * @param req
   * @returns
   */
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
      if (error.status !== 401) {
        throw new Error('Something went wrong');
      }

      throw new UnauthorizedException('Invalid token');
    }
  }
}
