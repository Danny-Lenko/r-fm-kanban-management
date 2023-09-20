import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { BoardsEntity } from 'src/boards/boards.entity';
import { UserEntity } from 'src/auth/user.entity';
import { BoardsRepository } from '../boards/boards.repository';

@Injectable()
export class SharedService {
  private logger = new Logger('BoardsService', { timestamp: true });

  constructor(private boardsRepository: BoardsRepository) {}

  async getBoardById(id: string, user: UserEntity): Promise<BoardsEntity> {
    const board = await this.boardsRepository.findOne({ where: { id, user } });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} was not found`);
    }

    return board;
  }

  async getBoardByIdWithColumns(
    id: string,
    user: UserEntity,
  ): Promise<BoardsEntity> {
    const board = await this.boardsRepository.findOne({
      where: {
        id: id,
        user,
      },
      relations: ['columns'],
    });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} not found`);
    }

    return board;
  }


}
