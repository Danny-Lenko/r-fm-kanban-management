import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsRepository } from './boards.repository';
import { BoardsEntity } from './boards.entity';

@Injectable()
export class BoardsService {
  // constructor(private boardsRepository: BoardsRepository) {}
  constructor(private readonly boardsRepository: BoardsRepository) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // getBoardsBySearch({ search }: FilterDto): Board[] {
  //   const boards = this.getAllBoards();

  //   return boards.filter(
  //     (board) =>
  //       board.name.toLowerCase().includes(search) ||
  //       board.category.toLowerCase().includes(search),
  //   );
  // }

  async getBoardById(id: string): Promise<BoardsEntity> {
    const board = await this.boardsRepository.findOneBy({ id: id });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} was not found`);
    }

    return board;
  }

  // getBoardById(id: string): Board {
  //   const board = this.boards.find((board) => board.id === id);

  //   if (!board) {
  //     throw new NotFoundException(`board with id: ${id} was not found`);
  //   }

  //   return board;
  // }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardsEntity> {
    const board = this.boardsRepository.create(createBoardDto);
    return await this.boardsRepository.save(board);
  }

  // async createBoard(createBoardDto: CreateBoardDto): Promise<BoardsEntity> {
  //   const { name, category, columns } = createBoardDto;
  //   const board: BoardsEntity = {
  //     id: uuid(),
  //     name,
  //     category: category || '',
  //     columns: columns.map((col) => ({ ...col, id: uuid() })),
  //   };

  //   this.boards.push(board);
  //   return board;
  // }

  // deleteBoardById(id: string): Board[] {
  //   const found = this.getBoardById(id);
  //   return this.boards.filter((board) => board.id !== found.id);
  // }

  // updateNameById(id: string, name: string): Board[] {
  //   const board = this.getBoardById(id);
  //   board.name = name;

  //   return this.boards;
  // }
}
