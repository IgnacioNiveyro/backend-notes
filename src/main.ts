import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  app.enableCors({
    origin: frontendUrl,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`App corriendo en http://localhost:${port}`);
  console.log(`Aceptando CORS desde: ${frontendUrl}`);
}
bootstrap();
