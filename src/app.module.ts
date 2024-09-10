import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CPUFormularioModule } from './formularios/cpus/cpu-formulario.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la aplicación
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    AuthModule, // Conecta a MongoDB usando la URI desde las variables de entorno
    CPUFormularioModule, NotificationsModule, // Módulo de CPUFormulario
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
