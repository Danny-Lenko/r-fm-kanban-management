import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ColumnsService } from './columns.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateColumnDto } from './dto/create-column.dto';
import { UserEntity } from 'src/auth/user.entity';
import { ColumnsEntity } from './columns.entity';

@Controller('columns')
@UseGuards(AuthGuard())
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Post()
  createBoard(
    @Body() createColumnDto: CreateColumnDto,
    @GetUser() user: UserEntity,
  ): Promise<ColumnsEntity> {
    return this.columnsService.createColumn(createColumnDto, user);
  }

  @Patch('/:id/name')
  updateNameById(
    @Param('id') id: string,
    @Body('name') name: string,
    // @GetUser() user: UserEntity,
  ): Promise<ColumnsEntity> {
    return this.columnsService.updateColumnNameById(id, name);
  }
}
