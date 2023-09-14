import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { FilterDto } from './dto/filter.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoards(@Query() filterDto: FilterDto): Board[] {
    if (Object.keys(filterDto).length) {
      return this.boardsService.getBoardsBySearch(filterDto);
    }
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): Board[] {
    return this.boardsService.deleteBoardById(id);
  }

  @Patch('/:id/name')
  updateNameById(
    @Param('id') id: string,
    @Body('name') { name }: { name: string },
  ): Board[] {
    return this.boardsService.updateNameById(id, name);
  }
}
