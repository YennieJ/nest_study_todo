import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './todos/interceptors/logging-interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 글로벌로 적용할 때
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder() // 스웨거 설정
    .setTitle('할일 API')
    .setDescription('Yen 할일 API')
    .setVersion('1.0')
    .addTag('Todos', `Todos's description`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
