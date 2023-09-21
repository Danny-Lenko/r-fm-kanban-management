import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsEntity } from 'src/boards/boards.entity';
import { ColumnsEntity } from 'src/columns/columns.entity';
import { SharedService } from './shared.service';
import { BoardsRepository } from '../boards/boards.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([BoardsEntity, ColumnsEntity]),
    AuthModule,
  ],

  providers: [SharedService, BoardsRepository],
})
export class SharedModule {}
