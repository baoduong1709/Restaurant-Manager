import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  collection: 'attendances',
})
export class Attendance extends Document {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  checkInTime: Date;

  @Prop({ required: true })
  checkOutTime: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
