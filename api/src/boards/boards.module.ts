import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './Boards.repository';
import { ColumnEntity } from 'src/columns/columns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, ColumnEntity])],
  providers: [BoardsService, BoardsRepository],
  controllers: [BoardsController],
})
export class BoardsModule {}
