import { Injectable } from '@nestjs/common/decorators';
import { ColumnsEntity } from 'src/columns/columns.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ColumnsRepository extends Repository<ColumnsEntity> {
  constructor(private dataSource: DataSource) {
    super(ColumnsEntity, dataSource.createEntityManager());
  }

  async getById(id: string) {
    return this.findOne({ where: { id } });
  }
  // ...
}
