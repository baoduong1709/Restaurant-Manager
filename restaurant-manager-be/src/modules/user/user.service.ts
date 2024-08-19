import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MODELS } from 'src/libs/database/enum';
import { Model } from 'mongoose';
import { UserDocument } from 'src/libs/database/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(MODELS.USER_MODEL) private userModel: Model<UserDocument>,
  ) {}
  create(username: string, password: string, permission: string) {
    
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
