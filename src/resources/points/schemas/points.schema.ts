import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PointsDocument = HydratedDocument<Points>;

@Schema()
export class Points {
  @Prop()
  assessmentId: string;

  @Prop()
  points: number;
}

export const PointsSchema = SchemaFactory.createForClass(Points);
