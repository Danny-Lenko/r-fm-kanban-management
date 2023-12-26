import {
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsEntity } from './boards.entity';
import { UserEntity } from 'src/auth/user.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { SharedService } from '../shared/shared.service';
import { BoardsRepository } from './boards.repository';
import { ColumnsService } from '../columns/columns.service';
import { ICategory } from './categories.interface';

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

  async getAllBoardsByCategories(user: UserEntity): Promise<ICategory[]> {
    const boards = await this.getBoardsWithColumns(user);

    const categoriesMap = new Map<string, BoardsEntity[]>();
    boards.forEach((board) => {
      const category = board.category || 'Uncategorized';
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, []);
      }
      categoriesMap.get(category).push(board);
    });

    const categoriesArray = Array.from(categoriesMap).map(
      ([category, boards]) => ({
        category,
        boards,
      }),
    );

    return categoriesArray;
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

  async getBoardByIdWithDetails(
    id: string,
    user: UserEntity,
  ): Promise<BoardsEntity | undefined> {
    const board = await this.boardsRepository.findOne({
      where: { id, user },
      relations: ['columns', 'columns.tasks', 'columns.tasks.subtasks'],
      order: {
        columns: {
          order: 'ASC',
          tasks: {
            order: 'ASC',
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with id: ${id} not found`);
    }

    return board;
  }

  // ================================================ Create

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

  async createCategory({ category }, user: UserEntity): Promise<void> {
    const existingBoard = await this.boardsRepository.findOne({
      where: { user, category },
    });

    if (existingBoard) {
      // throw new Error(`Board with category '${category}' already exists`);
      throw new ConflictException(
        `Board with category '${category}' already exists`,
      );
    }

    const newBoard = {
      category,
      name: 'New Board',
      columns: [{ name: 'Column 1' }],
    };
    const board = this.boardsRepository.create({ ...newBoard, user });
    await this.boardsRepository.save(board);
  }

  // ====================================================== Update

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

    const board = await this.sharedService.getBoardByIdWithColumns(id, user);

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

  // ======================================== Delete

  async deleteBoardsByCategory(
    category: string,
    user: UserEntity,
  ): Promise<void> {
    const emptyOrNotCategory = category !== 'Uncategorized' ? category : '';

    const existingBoards = await this.boardsRepository.find({
      where: { category: emptyOrNotCategory, user },
    });

    if (!existingBoards || existingBoards.length === 0) {
      throw new NotFoundException(
        `No boards with category '${category}' found`,
      );
    }

    try {
      await this.boardsRepository.remove(existingBoards);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting boards with category '${category}': ${error.message}`,
      );
    }
  }
}
