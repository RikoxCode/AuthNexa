/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: mongoose.Model<User>,
  ) {}

  /**
   * This function returns a user without the password field
   *
   * @param user User | User[]
   * @returns User | User[] without password
   */
  sanitizeUser(user: any) {
    if (user instanceof Array) {

      const users = user.map((user: any) => {
        const { password, ...result } = user._doc;
        return result;
      });

      return users
    }

    const { password, ...result } = user;
    return result;
  }

  /**
   * This function returns all users in the database
   * @returns Promise<User[]>
   */
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  /**
   * This function returns a single user by ID
   * @param userId string
   * @returns Promise<User>
   */
  async findOneById(userId: string) {
    return await this.userModel.findOne({ _id: userId });
  }

  /**
   * This function returns a single user by username
   * @param username string
   * @returns Promise<User>
   */
  async findOneByUsername(username: string): Promise<User[]> {
    return await this.userModel.findOne({ username: username });
  }

  /**
   * This function creates a new user
   * @param user User
   * @returns Promise<User>
   */
  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * This function deletes a user by ID
   * @param userId string
   * @returns Promise<User>
   */
  async delete(userId: string) {
    return await this.userModel.deleteOne({ _id: userId });
  }

  /**
   * This function updates a user by ID
   * @param userId string
   * @param user User
   * @returns Promise<User>
   */
  async edit(userId: string, user: User) {
    return await this.userModel.updateOne({ _id: userId }, user);
  }
}
