import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Habilita timestamps para agregar createdAt y updatedAt
export class CPUFormulario extends Document {

  // Encabezado
  @Prop({ required: true })
  institucion: string;

  @Prop({ required: true })
  provincia: string;

  @Prop({ required: true })
  edificio: string;

  @Prop({ required: true })
  articulo: string;

  @Prop({ required: true })
  numeroFormulario: string; // Almacena el número del formulario



  // Campos permanetes
  @Prop({ required: true })
  marca: string;

  @Prop({ required: true })
  modelo: string;

  @Prop()
  serie: string;

  @Prop()
  activoFijo: string;

  @Prop()
  usuario: string;

  @Prop()
  oficina: string;

  @Prop()
  observacion: string;



  // Campos de CPU y Laptops
  @Prop()
  ram: number;

  @Prop()
  procesador: string;

  @Prop()
  sistemaOperativo: string;

  @Prop()
  almacenamiento: number;

  @Prop()
  porcentaje: number;

  

  // Monitores
  @Prop()
  pulgadas: number;



  // Teclados, mouses, impresora y televisor
  @Prop()
  tipo: string;



  // Scaners
  @Prop()
  numeroScan: number;



  // Impresora
  @Prop()
  direccionIP: string;

  @Prop()
  numeroImpresiones: number;



  // TelefonoIP
  @Prop()
  nombreRegistrado: string;

  @Prop()
  extension: number;



  // Televisores
  @Prop()
  smartTV: string;



  // Almacena el usuario que inició la sesión
  @Prop()
  usuarioCreador: string;
}

export const CPUFormularioSchema = SchemaFactory.createForClass(CPUFormulario);