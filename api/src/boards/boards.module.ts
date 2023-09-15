import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { ColumnEntity } from 'src/columns/columns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardsEntity, ColumnEntity])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
