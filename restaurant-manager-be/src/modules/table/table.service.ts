import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { MODELS } from 'src/libs/database/enum';
import { TableDocument } from 'src/libs/database/schemas/table.schema';
import { Model } from 'mongoose';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  constructor(
    @Inject(MODELS.TABLE_MODEL) private tableModel: Model<TableDocument>,
  ) {}
  async create(createTableDto: CreateTableDto) {
    try {
      const tableData = {
        no: createTableDto.no,
        status: createTableDto.status,
      };
      return await this.tableModel.create(tableData);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.tableModel.find();
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  async update(id: string) {
    await this.tableModel.findByIdAndUpdate(id, { status: false });
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
