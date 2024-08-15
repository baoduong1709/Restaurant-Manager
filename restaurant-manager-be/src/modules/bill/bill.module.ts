import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Lau39DatabaseModule } from 'src/libs/database/connection/lau39';

@Module({
  imports: [Lau39DatabaseModule],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
