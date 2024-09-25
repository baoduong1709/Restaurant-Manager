import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FOOD_STATUS } from '../enum';

export type FoodDocument = Food & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  collection: 'foods',
})
export class Food extends Document {
  @Prop({ required: true })
  foodName: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: String, enum: FOOD_STATUS, required: true })
  status: FOOD_STATUS;

  @Prop()
  imageUrl: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
