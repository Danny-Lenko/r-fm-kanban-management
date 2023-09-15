import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';

@Entity()
export class BoardsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'New' })
  category: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    cascade: true, // Allows cascading operations (e.g., insert, update, delete) on related columns
  })
  columns: ColumnEntity[];
}
