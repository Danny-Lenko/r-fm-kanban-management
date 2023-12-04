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
      relations: ['subtasks', 'column', 'column.board', 'column.board.columns'],
      order: {
        column: {
          board: {
            columns: {
              order: 'ASC',
            },
          },
        },
        subtasks: {
          order: 'ASC',
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`task with id: ${id} was not found`);
    }

    const column = task.column;

    if (!column) {
      throw new NotFoundException(
        `Column associated with task id: ${id} was not found`,
      );
    }

    const columnOptions = column.board.columns.map((column) => column.name);

    task['columnOptions'] = columnOptions;

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

    if (!column) {
      throw new NotFoundException(`Column with name ${status} not found`);
    }

    const maxOrderTask = await this.tasksRepository
      .createQueryBuilder('task')
      .select('MAX(task.order)', 'maxOrder')
      .where('task.column = :column', { column: column.id })
      .getRawOne();

    const maxOrder = maxOrderTask ? maxOrderTask.maxOrder || 0 : 0;

    const task = this.tasksRepository.create({
      ...createTaskDto,
      column: column,
      order: maxOrder + 1,
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
      for (const { id, title, isCompleted } of subtasks) {
        const existingSubtask = task.subtasks.find(
          (subtask) => id === subtask.id,
        );

        if (existingSubtask) {
          await this.subtasksService.updateSubtask(id, title, isCompleted);
        } else {
          const latestTask = await this.getTaskById(task.id);
          await this.subtasksService.createSubtask({
            title,
            task: latestTask,
          });
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

  async deleteTaskById(id: string): Promise<void> {
    const deletedTask = await this.tasksRepository.findOne({
      where: { id },
      relations: ['column'],
    });

    if (!deletedTask) {
      throw new NotFoundException(`task with id: ${id} not found`);
    }

    const queryRunner =
      this.tasksRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { order, column } = deletedTask;

      await queryRunner.manager.remove(deletedTask);

      await queryRunner.manager
        .createQueryBuilder()
        .update(TasksEntity)
        .set({ order: () => '"order" - 1' })
        .where('"order" > :order AND "columnId" = :columnId', {
          order,
          columnId: column.id,
        })
        .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
