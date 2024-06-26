import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './config';
import { env } from 'process';

async function bootstrap() {

  const logger = new Logger('Main')

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1')

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
    );

  await app.listen(envs.port);
  logger.log( `App corriendo en el puerto ${ envs.port }`)
 
  
}
bootstrap();
  