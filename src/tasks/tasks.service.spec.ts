import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { User } from 'src/auth/user.entity';
// import { NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser: User = {
  userName: 'John Doe',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    taskService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });
  describe('getTasks', () => {
    it('calls TaskRepository.getTasks and return the result', async () => {
      taskRepository.getTasks.mockResolvedValue('SomeValue');
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toEqual('SomeValue');
    });

    // describe('getTaskById', () => {
    //   it('calls TasksRepository.findOne and returns the result', async () => {
    //     const mockTask = {
    //       title: 'Test title',
    //       description: 'Test desc',
    //       id: 'someId',
    //       status: TaskStatus.OPEN,
    //     };

    //     taskRepository.taskEntityRepository.findOne.mockResolvedValue(mockTask);
    //     const result = await taskService.getTaskById('someId', mockUser);
    //     expect(result).toEqual(mockTask);
    //   });

    // it('calls TasksRepository.findOne and handles an error', async () => {
    //   taskRepository.taskEntityRepository.findOne.mockResolvedValue(null);
    //   expect(taskService.getTaskById('someId', mockUser)).rejects.toThrow(
    //     NotFoundException,
    //   );
    // });
    // });
  });
});
