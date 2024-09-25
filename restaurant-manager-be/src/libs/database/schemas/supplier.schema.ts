import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  collection: 'suppliers',
})
export class Supplier extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  contact_info: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
