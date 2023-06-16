import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The student has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - CPF is already in the database.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The students have been successfully returned.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.studentsService.findAll(page, limit);
  }

  @Get(':ra')
  @ApiResponse({
    status: 200,
    description: 'The student has been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findOne(@Param('ra') ra: string) {
    return this.studentsService.findOne(ra);
  }

  @Patch(':ra')
  @ApiResponse({
    status: 200,
    description: 'The student has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  update(@Param('ra') ra: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(ra, updateStudentDto);
  }

  @Delete(':ra')
  @ApiResponse({
    status: 200,
    description: 'The student has been successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  remove(@Param('ra') ra: string) {
    return this.studentsService.remove(ra);
  }
}
