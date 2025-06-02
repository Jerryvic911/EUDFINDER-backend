import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'admin' }) // or 'user' if needed later
  role: string;
}

// Use the modified UserDocument with _id typed as string
export type UserDocument = User & Document & { _id: string };

export const UserSchema = SchemaFactory.createForClass(User);
