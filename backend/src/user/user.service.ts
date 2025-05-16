import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from '../database/entities/user.entity';
import { Role } from '../common/enum/role.enum';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const admin = await this.findOneByEmail('admin@gmail.com');
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      const defaultAdmin = new this.userModel({
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: Role.ADMIN,
        is_active: true,
        name: 'Admin',
        surname: 'Admin',
      });
      await defaultAdmin.save();
    }
  }

  async createManager(dataUser: CreateUserDto): Promise<UserEntity> {
    const newUser = new this.userModel(dataUser);
    await newUser.save();
    return newUser;
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneByEmailWithPassword(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { last_login: new Date() });
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel
      .find({}, null, { sort: { created_at: -1 } })
      .exec();
  }

  async findOneById(_id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id }).exec();
  }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
