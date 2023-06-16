import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { ConflictException } from '@nestjs/common';
import { StudentsController } from './students.controller';

describe('StudentsController', () => {
  let studentsController: StudentsController;
  let studentsService: StudentsService;

  const studentsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const findStudentsMock = {
    students: [
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
    total: 2,
    page: 1,
    totalPages: 1,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsController,
        {
          provide: StudentsService,
          useValue: studentsServiceMock,
        },
      ],
    }).compile();

    studentsController = module.get<StudentsController>(StudentsController);
    studentsService = module.get<StudentsService>(StudentsService);
  });

  beforeEach(async () => {
    for (const key in studentsServiceMock) {
      studentsServiceMock[key].mockReset();
    }
  });

  it('should be defined', () => {
    expect(studentsController).toBeDefined();
    expect(studentsService).toBeDefined();
  });

  describe('create', () => {
    it('should return a created student', async () => {
      // Arrange
      studentsServiceMock.create.mockReturnValue(findStudentsMock.students[0]);
      const createStudentInput = {
        email: 'fulano@email.com',
        name: 'Fulano',
        cpf: '16050664005',
      };

      // Act
      const student = await studentsController.create(createStudentInput);

      // Assert
      expect(student).toMatchObject(findStudentsMock.students[0]);
      expect(studentsService.create).toHaveBeenCalledTimes(1);
    });

    it('should return a ConflictException beacause cpf is already in the database', async () => {
      // Arrange
      studentsServiceMock.create.mockImplementation(() => {
        throw new ConflictException();
      });
      const createStudentInput = {
        email: 'fulano@email.com',
        name: 'Fulano',
        cpf: '16050664005',
      };

      // Act, Assert
      await expect(
        async () => await studentsController.create(createStudentInput),
      ).rejects.toThrow(ConflictException);
      expect(studentsService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return paginated students', async () => {
      // Arrange
      studentsServiceMock.findAll.mockReturnValue(findStudentsMock);

      // Act
      const response = await studentsController.findAll(1, 2);

      // Assert
      expect(response.students).toHaveLength(2);
      expect(response.total).toBe(2);
      expect(studentsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the correspondent student by ra', async () => {
      // Arrange
      studentsServiceMock.findOne.mockReturnValue(findStudentsMock.students[0]);

      // Act
      const student = await studentsController.findOne(
        findStudentsMock.students[0].ra,
      );

      // Assert
      expect(student).toMatchObject(findStudentsMock.students[0]);
      expect(studentsService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return an updated student', async () => {
      // Arrange
      const updatedStudent = {
        ra: '0000002',
        email: 'ciclano@email.com',
        name: 'Ciclano Silva',
        cpf: '84289801013',
        createdAt: '2023-06-14T03:25:41.682Z',
        updatedAt: '2023-06-14T07:03:20.322Z',
      };

      const updateStudentInput = { name: 'Ciclano Silva' };

      studentsServiceMock.update.mockReturnValue(updatedStudent);

      // Act
      const student = await studentsController.update(
        updatedStudent.ra,
        updateStudentInput,
      );

      // Assert
      expect(student).toMatchObject(updatedStudent);
      expect(studentsService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a removed student', async () => {
      // Arrange
      studentsServiceMock.remove.mockReturnValue(findStudentsMock.students[0]);

      // Act
      const student = await studentsController.remove(
        findStudentsMock.students[0].ra,
      );

      // Assert
      expect(student).toMatchObject(findStudentsMock.students[0]);
      expect(studentsService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
