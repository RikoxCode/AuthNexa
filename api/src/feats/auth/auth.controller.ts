import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/local.guard';
import { UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import CreateSwaggerModel from '../users/swagger/create.swagger_model';
import LoginSwaggerModel from './swagger/login.swagger_model';
import BaseFunctions from 'src/core/base-functions';

@Controller('api/auth')
@ApiTags('AuthentificationService')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login User into the API' })
  @ApiParam({ name: 'User', type: LoginSwaggerModel })
  @ApiResponse({ status: 200, description: 'Return accesstoken' })
  async login(@Body() user: any) {
    try {
      BaseFunctions._log(
        'User ' + user.username + ' logged in',
        '200',
        'POST',
        '/api/auth/login',
      );

      return await this.authService.login(user);
    } catch (error) {
      if (error.status !== 401) {
        BaseFunctions._log(
          'Something went wrong with logging in to User ' + user.username,
          '500',
          'POST',
          '/api/auth/login',
        );

        return new InternalServerErrorException('Something went wrong');
      }

      BaseFunctions._log(
        'User ' + user.username + ' failed to log in',
        '401',
        'POST',
        '/api/auth/login',
      );

      return error;
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Create a User and Login User into the API' })
  @ApiParam({ name: 'User', type: CreateSwaggerModel })
  @ApiResponse({ status: 200, description: 'Return accesstoken' })
  async register(@Body() user: any) {
    return await this.authService.register(user);
  }

  @Post('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Search the User and respond with the Userprofile' })
  @ApiParam({ name: 'User', type: LoginSwaggerModel })
  @ApiResponse({ status: 200, description: 'Return User' })
  async getProfile(@Body() user: any) {
    return await this.authService.getProfile(user);
  }
}
