import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { TableModule } from './table/table.module';
import { BillModule } from './bill/bill.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [FoodModule, TableModule, BillModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
