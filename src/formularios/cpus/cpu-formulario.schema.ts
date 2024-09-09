import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Habilita timestamps para agregar createdAt y updatedAt
export class CPUFormulario extends Document {
  @Prop({ required: true })
  institucion: string;

  @Prop({ required: true })
  provincia: string;

  @Prop({ required: true })
  edificio: string;

  @Prop({ required: true })
  numeroFormulario: string; // Campo para almacenar el número del formulario

  @Prop({ required: true })
  articulo: string;

  @Prop({ required: true })
  marca: string;

  @Prop({ required: true })
  modelo: string;

  @Prop()
  serie: string;

  @Prop()
  activoFijo: string;

  @Prop()
  memoria: string;

  @Prop()
  procesador: string;

  @Prop()
  sistemaOperativo: string;

  @Prop()
  discoDuro: string;

  @Prop()
  porcentajeDiscoDuro: string;

  @Prop()
  ubicacion: string;

  @Prop()
  usuario: string;

  @Prop()
  observacion: string;

  @Prop()
  usuarioCreador: string; // Usuario que ha iniciado sesión y creó el formulario
}

export const CPUFormularioSchema = SchemaFactory.createForClass(CPUFormulario);
