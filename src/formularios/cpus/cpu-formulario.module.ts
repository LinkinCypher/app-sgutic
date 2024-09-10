import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CPUFormulario, CPUFormularioSchema } from './cpu-formulario.schema';
import { CPUFormularioController } from './cpu-formulario.controller';
import { CPUFormularioService } from './cpu-formulario.service';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: CPUFormulario.name, schema: CPUFormularioSchema }]),
  NotificationsModule
  ],
  controllers: [CPUFormularioController],
  providers: [CPUFormularioService],
})
export class CPUFormularioModule {}
