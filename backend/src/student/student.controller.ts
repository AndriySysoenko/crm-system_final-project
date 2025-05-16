import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
// import { CreateStudentDto } from './dto/create-student.dto';
// import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { StudentEntity } from '../database/entities/student.entity';
import { StudentType } from '../common/interface/Student';
import {
  ReqQueryDto,
  ResQueryDto,
} from '../common/pagination/pagination.query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // @Post()
  // create(@Body() createStudentDto: CreateStudentDto) {
  //   return this.studentService.create(createStudentDto);
  // }

  @ApiOkResponse({ type: StudentEntity })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async findAll(
    @Query() query?: ReqQueryDto,
  ): Promise<ResQueryDto<StudentType>> {
    return this.studentService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studentService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
  //   return this.studentService.update(+id, updateStudentDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studentService.remove(+id);
  // }
}
