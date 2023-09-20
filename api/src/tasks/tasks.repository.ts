import { Injectable } from '@nestjs/common/decorators';
import { Repository, DataSource } from 'typeorm';
import { TasksEntity } from './tasks.entity';

@Injectable()
export class TasksRepository extends Repository<TasksEntity> {
  constructor(private dataSource: DataSource) {
    super(TasksEntity, dataSource.createEntityManager());
  }

  async getById(id: string) {
    return this.findOne({ where: { id } });
  }
  // ...
}
