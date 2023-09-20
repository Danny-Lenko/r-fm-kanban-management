import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardsEntity } from 'src/boards/boards.entity';
import { UserEntity } from 'src/auth/user.entity';
import { BoardsRepository } from './boards.repository';


@Injectable()
export class SharedService {
  constructor(private boardsRepository: BoardsRepository) {}

  async getBoardById(id: string, user: UserEntity): Promise<BoardsEntity> {
    const board = await this.boardsRepository.findOne({ where: { id, user } });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} was not found`);
    }

    return board;
  }
}
