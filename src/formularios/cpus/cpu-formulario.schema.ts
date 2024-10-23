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
  numeroFormulario: string; // Almacena el número del formulario

  @Prop({ required: true })
  articulo: string;



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
  ram: string;

  @Prop()
  procesador: string;

  @Prop()
  sistemaOperativo: string;

  @Prop()
  almacenamiento: string;

  @Prop()
  porcentaje: string;

  
  // Monitores
  @Prop()
  pulgadas: string;


  // Teclados y Mouses
  @Prop()
  tipo: string;


  // Scaners
  @Prop()
  numeroScan: string;


  // TipoImpresora
  @Prop()
  tipoImpresora: string;

  @Prop()
  direccionIP: string;

  @Prop()
  numeroImpresiones: string;


  // TelefonoIP
  @Prop()
  nombreRegistrado: string;

  @Prop()
  extension: string;


  // Televisores
  @Prop()
  tipoTV: string;

  @Prop()
  smartTV: string;


  // Almacena el usuario que inició la sesión
  @Prop()
  usuarioCreador: string;
}

export const CPUFormularioSchema = SchemaFactory.createForClass(CPUFormulario);