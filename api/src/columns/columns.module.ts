import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ColumnsEntity } from 'src/columns/columns.entity';
import { ColumnsService } from './columns.service';
import { AuthModule } from 'src/auth/auth.module';
import { TasksEntity } from 'src/tasks/tasks.entity';
import { ColumnsController } from './columns.controller';
import { BoardsService } from 'src/boards/boards.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ColumnsEntity, TasksEntity]),
    AuthModule,
  ],
  providers: [ColumnsService, BoardsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
