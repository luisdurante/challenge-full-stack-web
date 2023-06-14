import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.studentsService.findAll(page, limit);
  }

  @Get(':ra')
  findOne(@Param('ra') ra: string) {
    return this.studentsService.findOne(ra);
  }

  @Patch(':ra')
  update(@Param('ra') ra: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(ra, updateStudentDto);
  }

  @Delete(':ra')
  remove(@Param('ra') ra: string) {
    return this.studentsService.remove(ra);
  }
}
