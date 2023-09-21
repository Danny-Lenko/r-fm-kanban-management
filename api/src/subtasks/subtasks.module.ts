import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { TasksEntity } from 'src/tasks/tasks.entity';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './subtasks.service';
import { SubtasksEntity } from './subtasks.entity';
import { SubtasksRepository } from './subtasks.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([SubtasksEntity, TasksEntity]),
    AuthModule,
  ],
  controllers: [SubtasksController],
  providers: [SubtasksService, SubtasksRepository],
})
export class SubtasksModule {}
