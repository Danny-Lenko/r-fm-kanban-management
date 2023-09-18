import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BoardsEntity } from 'src/boards/boards.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  userEmail: string;

  @Column()
  password: string;

  @OneToMany(() => BoardsEntity, (boards) => boards.user, { eager: true })
  boards: BoardsEntity[];
}
