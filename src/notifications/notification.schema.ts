import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  mensaje: string;

  @Prop({ required: true })
  destinatario: string;  // Usuario que recibirá la notificación

  @Prop({ default: false })
  leido: boolean;  // Indica si el usuario ya vio la notificación
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
