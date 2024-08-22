import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  nombres: string;

  @Prop({ required: true })
  apellidos: string;

  @Prop({ required: true, unique: true })
  usuario: string;

  @Prop({ required: true })
  contraseña: string;

  @Prop({ required: true })
  rol: string;

  @Prop({ default: 'activo' })
  estado: string;

  @Prop({ type: Date })
  cumpleaños: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
