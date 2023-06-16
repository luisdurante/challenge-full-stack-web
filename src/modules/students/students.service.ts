import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const studentRa = await this.generateId();
      const student = this.studentsRepository.create({
        ...createStudentDto,
        ra: studentRa,
      });

      return await this.studentsRepository.save(student);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('CPF already exists');
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(requestedPage: number, limit: number): Promise<any> {
    const take = limit || 10;
    const page = requestedPage || 1;
    const skip = (page - 1) * take;

    const response = await this.studentsRepository.findAndCount({
      order: { ra: 'ASC' },
      take: take,
      skip: skip,
    });

    return {
      students: response[0],
      total: response[1],
      page,
      totalPages: Math.ceil(response[1] / take),
    };
  }

  async findOne(studentRa: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { ra: studentRa },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async update(
    studentRa: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentsRepository.preload({
      ra: studentRa,
      ...updateStudentDto,
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.studentsRepository.save(student);
  }

  async remove(studentRa: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { ra: studentRa },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.studentsRepository.remove(student);
  }

  private async generateId(): Promise<string> {
    const lastId =
      +(
        await this.studentsRepository
          .createQueryBuilder('students')
          .select('MAX(ra)', 'lastId')
          .getRawOne()
      ).lastId + 1;

    return `${lastId}`.padStart(7, '0');
  }
}
