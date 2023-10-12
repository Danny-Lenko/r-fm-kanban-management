import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksRepository } from './tasks.repository';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserEntity } from 'src/auth/user.entity';
import { SharedService } from '../shared/shared.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SubtasksService } from '../subtasks/subtasks.service';
import { EditTaskDto } from './dto/edit-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
    private sharedService: SharedService,
    private subtasksService: SubtasksService,
  ) {}

  async getTaskById(id: string): Promise<TasksEntity> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['subtasks'],
    });

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

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: UserEntity,
  ): Promise<void> {
    const { boardId, status, subtasks } = updateTaskDto;
    const { columns } = await this.sharedService.getBoardByIdWithColumns(
      boardId,
      user,
    );

    const column = columns.find((column) => column.name === status);

    const task = await this.getTaskById(id);
    task.status = status;
    task.column = column;

    this.tasksRepository.save(task);

    for (const { id, isCompleted } of subtasks) {
      await this.subtasksService.updateSubtaskState(id, isCompleted);
    }
  }

  async editTaskById(
    id: string,
    editTaskDto: EditTaskDto,
    user: UserEntity,
  ): Promise<void> {
    const { boardId, title, status, subtasks, description } = editTaskDto;
    const { columns } = await this.sharedService.getBoardByIdWithColumns(
      boardId,
      user,
    );

    const column = columns.find((column) => column.name === status);

    const task = await this.getTaskById(id);
    task.title = title;
    task.description = description;
    task.status = status;
    task.column = column;

    await this.tasksRepository.save(task);

    if (subtasks) {
      for (const { id, title } of subtasks) {
        const existingSubtask = task.subtasks.find(
          (subtask) => id === subtask.id,
        );

        if (existingSubtask) {
          await this.subtasksService.updateSubtaskTitle(id, title);
        } else {
          await this.subtasksService.createSubtask({ title, task });
        }
      }
    }

    const dtoSubtaskIds = subtasks.map((dtoSub) => dtoSub.id);

    for (const { id } of task.subtasks) {
      if (!dtoSubtaskIds.includes(id)) {
        await this.subtasksService.deleteSubtask(id);
      }
    }
  }
  
}
