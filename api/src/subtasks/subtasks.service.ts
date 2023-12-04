import { Injectable, NotFoundException } from '@nestjs/common';

import { SubtasksEntity } from './subtasks.entity';
import { SubtasksRepository } from './subtasks.repository';
import { CreateSubtaskDto } from './dto/create-subtask.dto';

@Injectable()
export class SubtasksService {
  constructor(private subtasksRepository: SubtasksRepository) {}

  async getSubtaskById(id: string): Promise<SubtasksEntity> {
    const subtask = await this.subtasksRepository.findOne({ where: { id } });

    if (!subtask) {
      throw new NotFoundException(`subtask with id: ${id} was not found`);
    }

    return subtask;
  }

  async updateSubtaskState(id: string, isCompleted: boolean): Promise<void> {
    const result = await this.getSubtaskById(id);

    result.isCompleted = isCompleted;
    this.subtasksRepository.save(result);
  }

  async updateSubtaskTitle(id: string, title: string): Promise<void> {
    const result = await this.getSubtaskById(id);

    result.title = title;
    this.subtasksRepository.save(result);
  }

  async updateSubtask(
    id: string,
    title: string,
    isCompleted: boolean,
  ): Promise<void> {
    const result = await this.getSubtaskById(id);

    result.title = title;
    result.isCompleted = isCompleted;
    this.subtasksRepository.save(result);
  }

  async createSubtask(createSubtaskDto: CreateSubtaskDto): Promise<void> {
    const { task } = createSubtaskDto;

    const maxOrderTask = await this.subtasksRepository
      .createQueryBuilder('subtask')
      .select('MAX(subtask.order)', 'maxOrder')
      .where('subtask.task = :task', { task: task.id })
      .getRawOne();

    const maxOrder = maxOrderTask ? maxOrderTask.maxOrder || 0 : 0;

    const subtask = this.subtasksRepository.create({
      ...createSubtaskDto,
      order: maxOrder + 1,
    });
    this.subtasksRepository.save(subtask);
  }

  async deleteSubtask(id: string): Promise<void> {
    const result = await this.subtasksRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`subtask with id: ${id} not found`);
    }
    return;
  }
}
