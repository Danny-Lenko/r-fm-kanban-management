import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BoardEntity } from './boards.entity';

@Injectable()
export class BoardsRepository {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly taskEntityRepository: Repository<BoardEntity>,
  ) {}
}
