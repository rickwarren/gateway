import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

Object.defineProperty(BigInt.prototype, "toJSON", {
  get() {
      "use strict";
      return () => String(this);
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
