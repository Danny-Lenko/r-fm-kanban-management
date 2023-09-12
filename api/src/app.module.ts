import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [TasksModule, BoardsModule],
})
export class AppModule {}
