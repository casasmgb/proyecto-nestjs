import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar SWAGER
  const config = new DocumentBuilder()
    .setTitle('API de Nest')
    .addTag('API')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilitar validacion global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //elimina datos no definidos en DTO
      forbidNonWhitelisted: true, // rechazar request con propiedades no permitidas
      transform: true // tranformacion de tipos automatico
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
