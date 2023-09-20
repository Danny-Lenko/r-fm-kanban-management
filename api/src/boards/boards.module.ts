import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BoardsEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { ColumnsEntity } from 'src/columns/columns.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SharedService } from 'src/shared/shared.service';
import { BoardsRepository } from 'src/shared/boards.repository';
import { ColumnsRepository } from 'src/columns/columns.repository';
import { ColumnsService } from 'src/columns/columns.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([BoardsEntity, ColumnsEntity]),
    AuthModule,
  ],
  providers: [
    BoardsService,
    SharedService,
    ColumnsService,
    BoardsRepository,
    ColumnsRepository,
  ],
  controllers: [BoardsController],
})
export class BoardsModule {}
