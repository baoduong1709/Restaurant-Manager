declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './common/response/interceptor/response.interceptor';
import { HttpExceptionFilter } from './common/filters/error.http..filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  await app.listen(1709);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
