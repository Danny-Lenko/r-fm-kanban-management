import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ColumnsEntity } from './columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UserEntity } from 'src/auth/user.entity';
import { SharedService } from '../shared/shared.service';
import { ColumnsRepository } from './columns.repository';

@Injectable()
export class ColumnsService {
  private logger = new Logger('ColumnsService', { timestamp: true });

  constructor(
    private readonly columnsRepository: ColumnsRepository,
    private readonly sharedService: SharedService,
  ) {}

  async createColumn(
    createColumnDto: CreateColumnDto,
    user: UserEntity,
  ): Promise<ColumnsEntity> {
    const { board } = createColumnDto;
    const result = await this.sharedService.getBoardById(board.id, user);

    const column = this.columnsRepository.create({
      ...createColumnDto,
      board: result,
    });

    return this.columnsRepository.save(column);
  }

  async getColumnById(id: string): Promise<ColumnsEntity> {
    const column = await this.columnsRepository.findOne({ where: { id } });

    if (!column) {
      throw new NotFoundException(`column with id: ${id} not found`);
    }

    return column;
  }

  async updateColumnNameById(id: string, name: string) {
    const column = await this.getColumnById(id);

    column.name = name;
    return this.columnsRepository.save(column);
  }

  async deleteColumnById(id: string): Promise<ColumnsEntity> {
    const result = await this.columnsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`column with id: ${id} not found`);
    }
    return;
  }
}
