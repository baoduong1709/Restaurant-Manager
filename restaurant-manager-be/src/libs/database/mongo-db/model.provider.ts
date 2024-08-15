import { Connection } from 'mongoose';
import { MODELS } from '../enum';
import { Table, TableSchema } from '../schemas/table.schema';
import { getConnectionToken } from '@nestjs/mongoose';
import { MONGODB_CONNECTION_NAME } from '../constant/const';
import { Food, FoodSchema } from '../schemas/food.shema';
import { Bill, BillSchema } from '../schemas/bill.schema';
import { User, UserSchema } from '../schemas/user.schema';

export const modelProviders = [
  {
    provide: MODELS.TABLE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(Table.name, TableSchema),
    inject: [getConnectionToken(MONGODB_CONNECTION_NAME.LAU39)],
  },
  {
    provide: MODELS.FOOD_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(Food.name, FoodSchema),
    inject: [getConnectionToken(MONGODB_CONNECTION_NAME.LAU39)],
  },
  {
    provide: MODELS.BILL_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(Bill.name, BillSchema),
    inject: [getConnectionToken(MONGODB_CONNECTION_NAME.LAU39)],
  },
  {
    provide: MODELS.USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(User.name, UserSchema),
    inject: [getConnectionToken(MONGODB_CONNECTION_NAME.LAU39)],
  },
];
