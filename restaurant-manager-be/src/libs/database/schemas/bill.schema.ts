import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BILL_STATUS } from '../enum';
import { Food, FoodSchema } from './food.shema';
import { Table, TableSchema } from './table.schema';

export type BillDocument = Bill & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  collection: 'bills',
})
export class Bill extends Document {
  @Prop({
    required: true,
    type: [
      {
        food: { type: FoodSchema, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  })
  foods: Array<{ food: Food; quantity: number }>;

  @Prop({ type: TableSchema, required: true })
  table: Table;

  @Prop({ type: String, enum: BILL_STATUS, required: true })
  status: BILL_STATUS;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
