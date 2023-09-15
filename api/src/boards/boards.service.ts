import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsEntity } from './boards.entity';

@Injectable()
export class BoardsService extends Repository<BoardsEntity> {
  constructor(private dataSource: DataSource) {
    super(BoardsEntity, dataSource.createEntityManager());
  }

  async getBoardById(id: string): Promise<BoardsEntity> {
    const board = await this.findOneBy({ id: id });

    if (!board) {
      throw new NotFoundException(`board with id: ${id} was not found`);
    }

    return board;
  }

  async getBoards({ search }: FilterDto): Promise<BoardsEntity[]> {
    const query = this.createQueryBuilder('board');

    if (search) {
      query.andWhere(
        'LOWER(board.name) LIKE LOWER(:search) OR LOWER(board.category) LIKE LOWER(:search)',
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

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardsEntity> {
    const board = this.create(createBoardDto);
    return await this.save(board);
  }

  async deleteBoardById(id: string): Promise<BoardsEntity> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`board with id: ${id} not found`);
    }
    return;
  }

  async updateNameById(id: string, name: string): Promise<BoardsEntity> {
    const result = await this.getBoardById(id);

    result.name = name;
    this.save(result);

    return result;
  }
}
