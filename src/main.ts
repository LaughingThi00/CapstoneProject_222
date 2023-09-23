import { TransformInterceptor } from './blockchain/interceptors/transform.interceptor';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './blockchain/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: true
    cors: true,
  });

  // Apply prefix for all routes
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const constraints = validationErrors[0].constraints;
        const values = Object.values(constraints);
        // console.log('validationErrors: constraints', validationErrors[0].constraints)
        return new BadRequestException(values[0]);
      },
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    // new ClassSerializerInterceptor(reflector),
  );
  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('The APIs description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/document', app, document);

  console.log(
    `Open http://localhost:${process.env.APP_PORT}/api/document to see the documentation`,
  );

  // Start listening
  await app.listen(process.env.APP_PORT);
}
bootstrap();
