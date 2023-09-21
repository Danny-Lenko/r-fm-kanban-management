import { Injectable } from '@nestjs/common/decorators';
import { Repository, DataSource } from 'typeorm';
import { SubtasksEntity } from './subtasks.entity';

@Injectable()
export class SubtasksRepository extends Repository<SubtasksEntity> {
  constructor(private dataSource: DataSource) {
    super(SubtasksEntity, dataSource.createEntityManager());
  }

  async getById(id: string) {
    return this.findOne({ where: { id } });
  }
  // ...
}
