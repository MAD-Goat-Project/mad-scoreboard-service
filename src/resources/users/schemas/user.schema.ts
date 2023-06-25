import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Points } from '../../points/schemas/points.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  clientId: string;

  @Prop()
  totalPoints: number;

  @Prop()
  points: Points[];
}

export const UserSchema = SchemaFactory.createForClass(User);
