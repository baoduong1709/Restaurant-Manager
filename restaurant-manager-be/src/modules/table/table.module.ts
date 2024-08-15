import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { Lau39DatabaseModule } from 'src/libs/database/connection/lau39';

@Module({
  imports: [Lau39DatabaseModule],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
