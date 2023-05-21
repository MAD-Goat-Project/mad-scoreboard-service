import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateRandomName } from '@MAD-Goat-Project/mad-name-generator';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByClientID(clientId: string) {
    return this.userModel.findOne({ clientId }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generate(factor: string) {
    return generateRandomName(factor);
  }
}
