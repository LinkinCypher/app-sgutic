import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Carga las variables de entorno desde el archivo .env

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; // Usa el puerto de la variable de entorno o el puerto 3000 por defecto
  await app.listen(port);
  console.log(`La aplicación se está ejecutando en: http://localhost:${port}`);
}
bootstrap();
