import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { TableModule } from './table/table.module';
import { BillModule } from './bill/bill.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FoodModule, TableModule, BillModule, AuthModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
