import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UnauthorizedException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import CreateSwaggerModel from './swagger/create.swagger_model';
import BaseFunctions from 'src/core/base-functions';
import { User } from './schemas/user.schema';
import { AuthGuard } from '../auth/guards/local.guard';

@ApiTags('UsersService')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * This function returns all users
   * @description Its a GET request
   * @description AuthGuard is used to protect the route
   * @returns all users
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll() {
    BaseFunctions._log('All users found', '200', 'GET', '/api/users/');

    return await this.userService.findAll();
  }

  /**
   * This function returns a single user by ID
   * @description Its a GET request
   * @description AuthGuard is used to protect the route
   * @param id
   * @returns
   */
  @Get(':id/id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return user.' })
  async findOneById(@Param('id') id: string) {
    // Log the request
    BaseFunctions._log(
      'User with id: ' + id + ' found',
      '200',
      'GET',
      '/api/users/:id/id',
    );

    // Return the user
    return await this.userService.findOneById(id);
  }

  /**
   * This function returns a single user by username
   * @description Its a GET request
   * @description AuthGuard is used to protect the route
   * @param username
   * @returns
   */
  @Get(':username/username')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by username' })
  @ApiParam({ name: 'username', type: String })
  @ApiResponse({ status: 200, description: 'Return user.' })
  async findOneByUsername(@Param('username') username: string) {
    // Log the request
    BaseFunctions._log(
      'User with username: ' + username + ' found',
      '200',
      'GET',
      '/api/users/:username/username',
    );

    // Return the user
    return await this.userService.findOneByUsername(username);
  }

  /**
   * This function creates a new user
   * @description Its a POST request
   * @description AuthGuard is used to protect the route
   * @param user
   * @returns
   */
  @Post('create')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateSwaggerModel })
  @ApiResponse({ status: 200, description: 'Return user.' })
  async create(@Body() user: User) {
    // try to create the user
    try {
      // log the request if it was successful
      BaseFunctions._log(
        'User with username: ' + user.username + ' created',
        '200',
        'POST',
        '/api/auth/create',
      );

      // return the created user
      return await this.userService.create(user);
    } catch (error) {
      if (error.code === 11000) {
        BaseFunctions._log(
          'Email already exists try: ' + user.email + ' failed',
          '401',
          'POST',
          '/api/auth/create',
        );

        throw new UnauthorizedException('Email already exists');
      }

      BaseFunctions._log(
        'Something went wrong try to create: ' +
          JSON.stringify(user) +
          ' failed',
        '500',
        'POST',
        '/api/auth/create',
      );

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  /**
   * This function deletes a user by ID
   * Its a DELETE request
   * AuthGuard is used to protect the route
   * @param id
   * @returns
   */
  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return user.' })
  async delete(@Param('id') id: string) {
    try {
      BaseFunctions._log(
        'User with id: ' + id + ' deleted',
        '200',
        'DELETE',
        '/api/auth/delete',
      );

      return await this.userService.delete(id);
    } catch (error) {
      if (id === undefined) {
        BaseFunctions._log(
          'User with id: ' + id + ' not found',
          '401',
          'DELETE',
          '/api/auth/delete',
        );

        throw new UnauthorizedException('User not found');
      }

      BaseFunctions._log(
        'Something went wrong try to delete: ' + id + ' failed',
        '500',
        'DELETE',
        '/api/auth/delete',
      );

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  /**
   * This function updates a user by ID
   * Its a PUT request
   * AuthGuard is used to protect the route
   * @param id
   * @param user
   * @returns
   */
  @Put('edit/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Edit user' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CreateSwaggerModel })
  @ApiResponse({ status: 200, description: 'Return user.' })
  async edit(@Param('id') id: string, @Body() user: User) {
    try {
      BaseFunctions._log(
        'User with username: ' + user.username + ' edited',
        '200',
        'PUT',
        '/api/auth/edit',
      );

      return await this.userService.edit(id, user);
    } catch (error) {
      if (id === undefined) {
        BaseFunctions._log(
          'User with id: ' + id + ' not found',
          '401',
          'PUT',
          '/api/auth/edit',
        );

        throw new UnauthorizedException('User not found');
      }

      BaseFunctions._log(
        'Something went wrong try to edit: ' +
          id +
          ' | ' +
          JSON.stringify(user) +
          ' failed',
        '500',
        'PUT',
        '/api/auth/edit',
      );

      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
