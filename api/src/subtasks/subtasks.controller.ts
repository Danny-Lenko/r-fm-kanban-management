import {
  Controller,
  Patch,
  UseGuards,
  Param,
  Body,
  Get,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SubtasksService } from './subtasks.service';
import { SubtasksEntity } from './subtasks.entity';
import { CreateSubtaskDto } from './dto/create-subtask.dto';

@Controller('subtasks')
@UseGuards(AuthGuard())
export class SubtasksController {
  constructor(private subtasksService: SubtasksService) {}

  @Get('/:id')
  getSubtaskById(@Param('id') id: string): Promise<SubtasksEntity> {
    return this.subtasksService.getSubtaskById(id);
  }

  @Patch('/:id/state')
  async updateSubtaskState(
    @Param('id') id: string,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return await this.subtasksService.updateSubtaskState(id, isCompleted);
  }

  @Post()
  async creaSubtask(@Body() createSubtaskDto: CreateSubtaskDto): Promise<void> {
    return this.subtasksService.createSubtask(createSubtaskDto);
  }
}
