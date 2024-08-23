import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Audit extends Document {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  performedBy: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ type: MongooseSchema.Types.Mixed }) // Especifica que `details` puede ser de cualquier tipo
  details: any;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
