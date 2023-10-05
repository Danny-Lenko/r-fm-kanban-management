import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsEntity } from './boards.entity';
import { UserEntity } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ConfigService } from '@nestjs/config';
import { UpdateBoardDto } from './dto/update-board.dto';
import { SharedService } from '../shared/shared.service';
import { ICategory } from './categories.interface';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController', { timestamp: true });

  constructor(
    private boardsService: BoardsService,
    private configService: ConfigService,
    private sharedService: SharedService,
  ) {
    console.log('boards.controller:', configService.get('TEST_VALUE'));
  }

  @Get()
  getBoards(
    @Query() filterDto: FilterDto,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity[]> {
    this.logger.verbose(
      `User ${
        user.userName
      } is retrieving all boards. Filters: ${JSON.stringify(filterDto)}`,
    );

    return this.boardsService.getBoards(filterDto, user);
  }

  @Get('with-columns')
  getBoardsWithColumns(@GetUser() user: UserEntity): Promise<BoardsEntity[]> {
    return this.boardsService.getBoardsWithColumns(user);
  }

  @Get('by-categories')
  getBoardsByCategories(@GetUser() user: UserEntity): Promise<ICategory[]> {
    return this.boardsService.getAllBoardsByCategories(user);
  }

  @Get('/:id')
  getBoardById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity> {
    return this.sharedService.getBoardById(id, user);
  }

  @Get('/:id/with-columns')
  getBoardByIdWithColumns(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity> {
    return this.sharedService.getBoardByIdWithColumns(id, user);
  }

  @Post()
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity> {
    return this.boardsService.deleteBoardById(id, user);
  }

  @Patch('/:id/name')
  updateNameById(
    @Param('id') id: string,
    @Body('name') name: string,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity> {
    return this.boardsService.updateNameById(id, name, user);
  }

  @Put('/:id')
  updateBoardById(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.boardsService.updateBoardById(id, updateBoardDto, user);
  }
}
