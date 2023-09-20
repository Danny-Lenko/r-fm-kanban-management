import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksRepository } from './tasks.repository';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserEntity } from 'src/auth/user.entity';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
    private sharedService: SharedService,
  ) {}

  async getTaskById(id: string): Promise<TasksEntity> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`task with id: ${id} was not found`);
    }

    return task;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TasksEntity> {
    const { boardId, status } = createTaskDto;

    const { columns } = await this.sharedService.getBoardByIdWithColumns(
      boardId,
      user,
    );

    const column = columns.find((column) => column.name === status);

    const task = this.tasksRepository.create({
      ...createTaskDto,
      column: column,
    });

    return await this.tasksRepository.save(task);
  }
}
