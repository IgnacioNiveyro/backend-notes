import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Obtener la URL del frontend desde las variables de entorno
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  
  // Configuración para aceptar CORS solo desde la URL específica
  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`App corriendo en http://localhost:${port}`);
  console.log(`Aceptando CORS desde: ${frontendUrl}`);
}
bootstrap();