import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    cascade: true, // Allows cascading operations (e.g., insert, update, delete) on related columns
  })
  columns: ColumnEntity[];
}
