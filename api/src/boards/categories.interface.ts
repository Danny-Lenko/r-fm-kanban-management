import { BoardsEntity } from './boards.entity';

export interface ICategory {
  category: string;
  boards: BoardsEntity[];
}
