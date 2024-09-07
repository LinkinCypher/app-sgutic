import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CPUFormulario, CPUFormularioSchema } from './cpu-formulario.schema';
import { CPUFormularioController } from './cpu-formulario.controller';
import { CPUFormularioService } from './cpu-formulario.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CPUFormulario.name, schema: CPUFormularioSchema }])],
  controllers: [CPUFormularioController],
  providers: [CPUFormularioService],
})
export class CPUFormularioModule {}
