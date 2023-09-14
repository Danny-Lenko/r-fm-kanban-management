import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsRepository } from './boards.repository';
import { BoardsEntity } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  async getBoardById(id: string): Promise<BoardsEntity> {
    const board = await this.boardsRepository.findOneBy({ id: id });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} was not found`);
    }

    return board;
  }

  // getBoardsBySearch({ search }: FilterDto): Board[] {
  //   const boards = this.getAllBoards();

  //   return boards.filter(
  //     (board) =>
  //       board.name.toLowerCase().includes(search) ||
  //       board.category.toLowerCase().includes(search),
  //   );
  // }

  async getBoardByIdWithColumns(id: string): Promise<BoardsEntity> {
    const board = await this.boardsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['columns'],
    });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} not found`);
    }

    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardsEntity> {
    const board = this.boardsRepository.create(createBoardDto);
    return await this.boardsRepository.save(board);
  }

  async deleteBoardById(id: string): Promise<BoardsEntity> {
    const result = await this.boardsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`board with id: ${id} not found`);
    }
    return;
  }

  async updateNameById(id: string, name: string): Promise<BoardsEntity> {
    const result = await this.getBoardById(id);

    result.name = name;
    this.boardsRepository.save(result);

    return result;
  }
}
