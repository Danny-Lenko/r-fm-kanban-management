import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<TasksEntity> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TasksEntity> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Put('update/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.tasksService.updateTaskById(id, updateTaskDto, user);
  }

  @Put('edit/:id')
  editTaskById(
    @Param('id') id: string,
    @Body() editTaskDto: EditTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.tasksService.editTaskById(id, editTaskDto, user);
  }
}
