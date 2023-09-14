import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BoardsEntity } from 'src/boards/boards.entity';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => BoardsEntity, (board) => board.columns)
  board: BoardsEntity;
}
