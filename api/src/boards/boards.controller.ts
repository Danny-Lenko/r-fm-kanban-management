import {
  Controller,
  Get,
  Post,
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

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController', { timestamp: true });

  constructor(
    private boardsService: BoardsService,
    private configService: ConfigService,
  ) {
    console.log('boards.controller:', configService.get('TEST_VALUE'))
  }

  @Get()
  getBoards(
    @Query() filterDto: FilterDto,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity[]> {
    this.logger.verbose(
      `User ${user.userName} is retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );

    return this.boardsService.getBoards(filterDto, user);
  }

  @Get('/:id')
  getBoardById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity> {
    return this.boardsService.getBoardById(id, user);
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
}
