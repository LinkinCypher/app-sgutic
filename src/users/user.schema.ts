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
  password: string;

  @Prop({ required: true })
  rol: number; 

  @Prop({ default: true })
  estado: boolean;

  @Prop({ type: Date })
  fecha_nacimiento: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
