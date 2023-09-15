import { Injectable } from '@nestjs/common/decorators';
import { Repository, DataSource } from 'typeorm';

import { BoardsEntity } from './boards.entity';

@Injectable()
export class BoardsRepository extends Repository<BoardsEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardsEntity, dataSource.createEntityManager());
  }

  // async createBoard()
  // async getById(id: string) {
  //   return this.findOne({ where: { id } });
  // }
  // ...
}
