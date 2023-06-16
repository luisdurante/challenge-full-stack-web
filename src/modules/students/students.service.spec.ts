import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { NotFoundException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { SelectQueryBuilder } from 'typeorm';

describe('StudentsService', () => {
  let studentsService: StudentsService;

  const studentsRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const findAndCountMock = [
    [
      {
        ra: '0000001',
        email: 'fulano@email.com',
        name: 'Fulano',
        cpf: '16050664005',
        createdAt: '2023-06-14T03:25:41.682Z',
        updatedAt: '2023-06-14T03:25:41.682Z',
      },
      {
        ra: '0000002',
        email: 'ciclano@email.com',
        name: 'Ciclano',
        cpf: '84289801013',
        createdAt: '2023-06-14T03:25:41.682Z',
        updatedAt: '2023-06-14T03:25:41.682Z',
      },
    ],
    2,
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: studentsRepositoryMock,
        },
      ],
    }).compile();

    studentsService = module.get<StudentsService>(StudentsService);
  });

  beforeEach(async () => {
    for (const key in studentsRepositoryMock) {
      studentsRepositoryMock[key].mockReset();
    }
  });

  it('should be defined', () => {
    expect(studentsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated students', async () => {
      // Arrange
      studentsRepositoryMock.findAndCount.mockReturnValue(findAndCountMock);

      // Act
      const response = await studentsService.findAll(1, 2);

      // Assert
      expect(response.students).toHaveLength(2);
      expect(studentsRepositoryMock.findAndCount).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return an existing student', async () => {
      // Arrange
      studentsRepositoryMock.findOne.mockReturnValue(findAndCountMock[0][0]);

      // Act
      const student = await studentsService.findOne(findAndCountMock[0][0].ra);

      // Assert
      expect(student).toMatchObject(findAndCountMock[0][0]);
      expect(studentsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException when student does not exist', async () => {
      // Arrange
      studentsRepositoryMock.findOne.mockReturnValue(null);

      // Act, Assert
      await expect(studentsService.findOne('99999')).rejects.toThrow(
        NotFoundException,
      );
      expect(studentsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and return an student', async () => {
      // Arrange
      const createdStudent = {
        ra: '0000003',
        email: 'fulano@email.com',
        name: 'Fulano',
        cpf: '16050664005',
        createdAt: '2023-06-14T03:25:41.682Z',
        updatedAt: '2023-06-14T03:25:41.682Z',
      };

      studentsRepositoryMock.create.mockReturnValue(createdStudent);
      studentsRepositoryMock.save.mockReturnValue(createdStudent);

      jest
        .spyOn(studentsRepositoryMock, 'createQueryBuilder')
        .mockReturnValueOnce(
          createMock<SelectQueryBuilder<Student>>({
            select: jest.fn().mockReturnValueOnce(
              createMock<SelectQueryBuilder<Student>>({
                getRawOne: jest
                  .fn()
                  .mockResolvedValueOnce({ lastId: '0000002' }),
              }),
            ),
          }),
        );

      const createStudentInput = {
        email: 'fulano@email.com',
        name: 'Fulano',
        cpf: '16050664005',
      };

      // Act
      const student = await studentsService.create(createStudentInput);

      console.log();

      // Assert
      expect(student.ra).toBe(createdStudent.ra);
      expect(student).toMatchObject(createStudentInput);
      expect(studentsRepositoryMock.create).toHaveBeenCalledTimes(1);
      expect(studentsRepositoryMock.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update and return an existing student', async () => {
      // Arrange
      const updateStudentInput = {
        email: 'fulano2@email.com',
        name: 'Fulano da Silva',
      };

      const studentResponse = {
        ra: '0000001',
        email: 'fulano2@email.com',
        name: 'Fulano da Silva',
        cpf: '16050664005',
        createdAt: '2023-06-14T03:25:41.682Z',
        updatedAt: '2023-06-14T03:30:41.682Z',
      };

      studentsRepositoryMock.preload.mockReturnValue(studentResponse);
      studentsRepositoryMock.save.mockReturnValue(studentResponse);

      // Act
      const student = await studentsService.update(
        studentResponse.ra,
        updateStudentInput,
      );

      // Assert
      expect(student).toMatchObject(studentResponse);
      expect(studentsRepositoryMock.preload).toHaveBeenCalledTimes(1);
      expect(studentsRepositoryMock.save).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException when student does not exist', async () => {
      // Arrange
      const updateStudentInput = {
        email: 'fulano2@email.com',
        name: 'Fulano da Silva',
      };

      studentsRepositoryMock.preload.mockReturnValue(null);

      // Act, Assert
      await expect(
        studentsService.update('999', updateStudentInput),
      ).rejects.toThrow(NotFoundException);
      expect(studentsRepositoryMock.preload).toHaveBeenCalledTimes(1);
      expect(studentsRepositoryMock.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should remove and return the removed student', async () => {
      // Arrange
      studentsRepositoryMock.findOne.mockReturnValue(findAndCountMock[0][0]);
      studentsRepositoryMock.remove.mockReturnValue(findAndCountMock[0][0]);

      // Act
      const student = await studentsService.remove(findAndCountMock[0][0].ra);

      // Assert
      expect(student).toMatchObject(findAndCountMock[0][0]);
      expect(studentsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
      expect(studentsRepositoryMock.remove).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException when student does not exist', async () => {
      // Arrange
      studentsRepositoryMock.findOne.mockReturnValue(null);

      // Act, Assert
      await expect(studentsService.remove('999')).rejects.toThrow(
        NotFoundException,
      );
      expect(studentsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
      expect(studentsRepositoryMock.remove).toHaveBeenCalledTimes(0);
    });
  });
});
