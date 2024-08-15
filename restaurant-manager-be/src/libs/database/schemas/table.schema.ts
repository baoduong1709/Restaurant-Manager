import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableDocument = Table & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  collection: 'tables',
})
export class Table extends Document {
  @Prop({ required: true, unique: true })
  no: number;

  @Prop({ required: true })
  status: boolean;

  @Prop()
  billId: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);
