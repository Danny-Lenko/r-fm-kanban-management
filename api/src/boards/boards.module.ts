import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { ColumnEntity } from 'src/columns/columns.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([BoardsEntity, ColumnEntity]),
    AuthModule,
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
