import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolDocument = School & Document;

// Define Accommodation subdocument schema
@Schema({ _id: false }) // _id: false so Mongoose doesn’t add an extra _id for this subdoc
export class Accommodation {
  @Prop({ required: true })
  hostel: number;

  @Prop({ required: true })
  feeding: number;
}

const AccommodationSchema = SchemaFactory.createForClass(Accommodation);

// Main School Schema
@Schema({ timestamps: true })
export class School {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  schoolFees: number;

  @Prop({ type: AccommodationSchema }) // Embed the subdocument schema
  accommodation: Accommodation;

  @Prop({ type: [String] })
  courses: string[];

  @Prop()
  postUtmeDate: string;

  @Prop()
  hasPostUtme: boolean;

  @Prop({ type: Number })
  cutOffMark: number;

  @Prop()
  aboutSchool: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
