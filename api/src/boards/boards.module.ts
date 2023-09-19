import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BoardsEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { ColumnsEntity } from 'src/columns/columns.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([BoardsEntity, ColumnsEntity]),
    AuthModule,
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
