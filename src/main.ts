import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Cargar las variables de entorno

  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde otros orígenes
  app.enableCors({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permitir estos métodos HTTP
    credentials: true, // Permitir el uso de cookies o autenticación basada en sesiones
  });

  const port = process.env.PORT || 3000; // Usa el puerto desde .env o el 3000 por defecto
  await app.listen(port, '0.0.0.0'); // Escuchar en todas las interfaces de red
  console.log(`La aplicación se está ejecutando en: http://0.0.0.0:${port}`);
}
bootstrap();
