import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la aplicación
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), // Conecta a MongoDB usando la URI desde las variables de entorno
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
