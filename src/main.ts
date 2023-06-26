import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors();

  await app.listen(port).then(() => {
    Logger.log(`Listening on port ${port}`, 'Main');
  });

  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RMQ_PRODUCER_URL')],
      queue: configService.get('RMQ_PRODUCER_QUEUE'),
    },
    queueOptions: { durable: configService.get('RMQ_PRODUCER_QUEUE_DURABLE') },
  });
  app.startAllMicroservices().then(() => {
    Logger.log('Microservice is listening', 'Main');
  });
}

bootstrap();
