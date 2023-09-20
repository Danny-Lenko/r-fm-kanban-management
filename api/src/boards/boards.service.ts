import { Injectable, NotFoundException, Logger } from '@nestjs/common';

import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsEntity } from './boards.entity';
import { UserEntity } from 'src/auth/user.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { SharedService } from '../shared/shared.service';
import { BoardsRepository } from '../shared/boards.repository';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class BoardsService {
  private logger = new Logger('BoardsService', { timestamp: true });

  constructor(
    private boardsRepository: BoardsRepository,
    private sharedService: SharedService,
    private columnsService: ColumnsService,
  ) {}

  async getBoards(
    { search }: FilterDto,
    user: UserEntity,
  ): Promise<BoardsEntity[]> {
    const query = this.boardsRepository.createQueryBuilder('board');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(board.name) LIKE LOWER(:search) OR LOWER(board.category) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const boards = await query.getMany();
      return boards;
    } catch (error) {
      this.logger.error(
        `Failed to get boards for user "${
          user.userName
        }". Filters: ${JSON.stringify(search)}`,
        error.stack,
      );
    }
  }

  async getBoardsWithColumns(user: UserEntity): Promise<BoardsEntity[]> {
    const query = this.boardsRepository.createQueryBuilder('board');
    query.where({ user });
    query.leftJoinAndSelect('board.columns', 'columns');

    try {
      const boards = await query.getMany();
      return boards;
    } catch (error) {
      this.logger.error(
        `Failed to get boards for user "${user.userName}".`,
        error.stack,
      );
    }
  }

  async getBoardByIdWithColumns(
    id: string,
    user: UserEntity,
  ): Promise<BoardsEntity> {
    const board = await this.boardsRepository.findOne({
      where: {
        id: id,
        user,
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
    const board = this.boardsRepository.create({ ...createBoardDto, user });

    return await this.boardsRepository.save(board);
  }

  async deleteBoardById(id: string, user: UserEntity): Promise<BoardsEntity> {
    const result = await this.boardsRepository.delete({ id, user });

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
    const result = await this.sharedService.getBoardById(id, user);

    result.name = name;
    this.boardsRepository.save(result);

    return result;
  }

  async updateBoardById(
    id: string,
    updateBoardDto: UpdateBoardDto,
    user: UserEntity,
  ): Promise<void> {
    const { name, category, columns } = updateBoardDto;

    const board = await this.getBoardByIdWithColumns(id, user);

    if (name) {
      board.name = name;
    }

    if (category) {
      board.category = category;
    }

    await this.boardsRepository.save(board);

    // update column or create if not existing
    if (columns) {
      for (const { id, name } of columns) {
        const existingColumn = board.columns.find((column) => id === column.id);

        if (existingColumn) {
          await this.columnsService.updateColumnNameById(id, name);
        } else {
          await this.columnsService.createColumn(
            { name, board: { id: board.id } },
            user,
          );
        }
      }
    }

    // remove columns
    const dtoColumnIds = columns.map((dtoCol) => dtoCol.id);
    for (const { id } of board.columns) {
      if (!dtoColumnIds.includes(id)) {
        await this.columnsService.deleteColumnById(id);
      }
    }
  }
}
