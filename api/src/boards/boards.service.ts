import { Injectable } from '@nestjs/common';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardsBySearch({ search }: { search: string }): Board[] {
    const boards = this.getAllBoards();

    return boards.filter(
      (board) =>
        board.name.toLowerCase().includes(search) ||
        board.category.toLowerCase().includes(search),
    );
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
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
    this.boards = this.boards.filter((board) => board.id !== id);

    return this.boards;
  }

  updateNameById(id: string, name: string): Board[] {
    const board = this.getBoardById(id);
    board.name = name;

    return this.boards;
  }
}
