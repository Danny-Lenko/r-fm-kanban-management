import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ColumnsEntity } from 'src/columns/columns.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksEntity } from './tasks.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TasksEntity, ColumnsEntity]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
