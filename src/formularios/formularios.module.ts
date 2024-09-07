import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CPUFormularioSchema } from './cpus/cpu-formulario.schema';
import { CPUFormularioService } from './cpus/cpu-formulario.service';
import { CPUFormularioController } from './cpus/cpu-formulario.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CPUFormulario', schema: CPUFormularioSchema }]), // Formulario de CPUs
    // Agregar otros formularios
  ],
  controllers: [CPUFormularioController], // Controlador para formularios de CPUs
  providers: [CPUFormularioService], // Servicio para formularios de CPUs
})
export class FormulariosModule {}
