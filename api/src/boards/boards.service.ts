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

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { name, columns } = createBoardDto;
    const board: Board = {
      id: uuid(),
      name,
      columns: columns.map((col) => ({ ...col, id: uuid() })),
    };

    this.boards.push(board);
    return board;
  }
}
