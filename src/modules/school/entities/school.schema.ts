import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class School extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: string;

  @Prop()
  fees: string;

  @Prop()
  accommodation: string;

  @Prop([String])
  courses: string[];

  @Prop()
  postUtmeDate: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
