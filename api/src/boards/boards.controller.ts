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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';
import { BoardsEntity } from './boards.entity';
import { UserEntity } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoards(@Query() filterDto: FilterDto): Promise<BoardsEntity[]> {
    return this.boardsService.getBoards(filterDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Promise<BoardsEntity> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: UserEntity,
  ): Promise<BoardsEntity> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): Promise<BoardsEntity> {
    return this.boardsService.deleteBoardById(id);
  }

  @Patch('/:id/name')
  updateNameById(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<BoardsEntity> {
    return this.boardsService.updateNameById(id, name);
  }
}
