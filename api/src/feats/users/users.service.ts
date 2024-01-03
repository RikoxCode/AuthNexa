import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User')
    private userModel: mongoose.Model<User>        
) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOneById(userId: string) {
    return await this.userModel.findOne({ _id: userId });
  }

  async findOneByUsername(username: string): Promise<User[]> {
    return await this.userModel.findOne({ username: username });
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async delete(userId: string) {
    return await this.userModel.deleteOne({ _id: userId });
  }

  async edit(userId: string, user: User) {
    return await this.userModel.updateOne({ _id: userId }, user);
  }
}