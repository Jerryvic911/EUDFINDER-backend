import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Accommodation {
  @Prop({ required: true })
  hostel: number;

  @Prop({ required: true })
  feeding: number;
}

@Schema()
export class School extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: string;

  @Prop({ required: true }) // Assuming fees is required
  schoolFees: number; // Change to number

  @Prop({ type: Accommodation }) // Change to accommodate the object structure
  accommodation: Accommodation; // Change to the Accommodation type

  @Prop({ type: [String] })
  courses: string[];

  @Prop()
  postUtmeDate: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
