import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Cargar las variables de entorno

  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde otros orígenes
  app.enableCors({
    origin: 'http://localhost:8100', // Permite solo solicitudes desde la aplicación Ionic
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`La aplicación se está ejecutando en: http://localhost:${port}`);
}
bootstrap();
