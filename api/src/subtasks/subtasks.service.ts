import { Injectable, NotFoundException } from '@nestjs/common';

import { SubtasksEntity } from './subtasks.entity';
import { SubtasksRepository } from './subtasks.repository';

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
}
