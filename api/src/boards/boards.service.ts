import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsEntity } from './boards.entity';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class BoardsService extends Repository<BoardsEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardsEntity, dataSource.createEntityManager());
  }

  async getBoardById(id: string, user: UserEntity): Promise<BoardsEntity> {
    const board = await this.findOne({ where: { id, user } });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} was not found`);
    }

    return board;
  }

  async getBoards(
    { search }: FilterDto,
    user: UserEntity,
  ): Promise<BoardsEntity[]> {
    const query = this.createQueryBuilder('board');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(board.name) LIKE LOWER(:search) OR LOWER(board.category) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const boards = await query.getMany();
    return boards;
  }

  async getBoardByIdWithColumns(id: string): Promise<BoardsEntity> {
    const board = await this.findOne({
      where: {
        id: id,
      },
      relations: ['columns'],
    });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} not found`);
    }

    return board;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardsEntity> {
    const board = this.create({ ...createBoardDto, user });

    return await this.save(board);
  }

  async deleteBoardById(id: string, user: UserEntity): Promise<BoardsEntity> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`board with id: ${id} not found`);
    }
    return;
  }

  async updateNameById(
    id: string,
    name: string,
    user: UserEntity,
  ): Promise<BoardsEntity> {
    const result = await this.getBoardById(id, user);

    result.name = name;
    this.save(result);

    return result;
  }
}
