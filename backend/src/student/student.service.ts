import { Injectable } from '@nestjs/common';
// import { CreateStudentDto } from './dto/create-student.dto';
// import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentType } from '../common/interface/Student';
import {
  ReqQueryDto,
  ResQueryDto,
} from '../common/pagination/pagination.query.dto';
import { builderQuery } from '../common/pagination/query-builder';
import { StudentEntity } from '../database/entities/student.entity';
import { Role } from '../common/enum/role.enum';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<StudentEntity>,
  ) {}

  public async findAll(
    query: ReqQueryDto,
    user?: { _id: string; role: Role },
  ): Promise<ResQueryDto<StudentType>> {
    const { filter, options } = builderQuery<StudentType>(query);

    if (query.onlyMy === 'true' && user.role === Role.MANAGER) {
      (filter as any)['manager'] = user._id;
    }

    const [data, total] = await Promise.all([
      this.studentModel.find(filter, null, options).exec(),
      this.studentModel.countDocuments(filter),
    ]);

    return {
      page: +query.page,
      pages: Math.ceil(total / (query.limit ?? 25)),
      limit: +query.limit,
      total,
      data,
    };
  }
  // create(createStudentDto: CreateStudentDto) {
  //   return 'This action adds a new student';
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} student`;
  // }
  //
  // update(id: number, updateStudentDto: UpdateStudentDto) {
  //   return `This action updates a #${id} student`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} student`;
  // }
}
