import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsRepository } from './Boards.repository';

@Injectable()
export class BoardsService {
  constructor(private boardsEntityRepository: BoardsRepository) {}

  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardsBySearch({ search }: FilterDto): Board[] {
    const boards = this.getAllBoards();

    return boards.filter(
      (board) =>
        board.name.toLowerCase().includes(search) ||
        board.category.toLowerCase().includes(search),
    );
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`board with id: ${id} was not found`);
    }

    return board;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { name, category, columns } = createBoardDto;
    const board: Board = {
      id: uuid(),
      name,
      category: category || '',
      columns: columns.map((col) => ({ ...col, id: uuid() })),
    };

    this.boards.push(board);
    return board;
  }

  deleteBoardById(id: string): Board[] {
    const found = this.getBoardById(id);
    return this.boards.filter((board) => board.id !== found.id);
  }

  updateNameById(id: string, name: string): Board[] {
    const board = this.getBoardById(id);
    board.name = name;

    return this.boards;
  }
}
