import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BoardEntity } from 'src/boards/boards.entity';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => BoardEntity, (board) => board.columns)
  board: BoardEntity;
}
