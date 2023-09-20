import { Injectable } from '@nestjs/common/decorators';
import { BoardsEntity } from 'src/boards/boards.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class BoardsRepository extends Repository<BoardsEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardsEntity, dataSource.createEntityManager());
  }

  async getById(id: string) {
    return this.findOne({ where: { id } });
  }
  // ...
}
