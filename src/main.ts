import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import appConfig from './configs/server.config';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appConfig(app);

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
