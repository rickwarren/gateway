import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptionFilter';

Object.defineProperty(BigInt.prototype, "toJSON", {
  get() {
      "use strict";
      return () => String(this);
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
