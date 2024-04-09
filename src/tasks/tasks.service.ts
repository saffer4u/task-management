import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskEntityRepository: TaskRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskEntityRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskEntityRepository.taskEntityRepository.findOne({
      where: { id: id, user: user },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const deleteResult =
      await this.taskEntityRepository.taskEntityRepository.delete({ id, user });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return;
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskEntityRepository.taskEntityRepository.save(task);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskEntityRepository.createTask(createTaskDto, user);
  }
}
