import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

import { ColumnsEntity } from './columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { BoardsService } from 'src/boards/boards.service';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class ColumnsService extends Repository<ColumnsEntity> {
  private logger = new Logger('BoardsService', { timestamp: true });

  constructor(
    private readonly dataSource: DataSource,
    private readonly boardsService: BoardsService,
  ) {
    super(ColumnsEntity, dataSource.createEntityManager());
  }

  async createColumn(
    createColumnDto: CreateColumnDto,
    user: UserEntity,
  ): Promise<ColumnsEntity> {
    const { board } = createColumnDto;
    const currentBoard = await this.boardsService.getBoardById(board.id, user);

    const column = this.create({ ...createColumnDto, board: currentBoard });

    return this.save(column);
  }
}
