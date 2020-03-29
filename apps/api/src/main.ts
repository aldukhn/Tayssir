/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';

// Important: load config before (!!!) you import AppModule
// https://github.com/nestjsx/crud/wiki/Controllers#global-options
// CrudConfigService.load({
//   auth: {
//     property: USER_REQUEST_KEY,
//   },
//   routes: {
//     // exclude: ['createManyBase'],
//   },
// });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Tayssir')
    .setDescription('Tayssir API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
