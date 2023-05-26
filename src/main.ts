import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NotFoundExceptionFilter } from './Exceptions/NotFoundException';
import { InternalServerErrorExceptionFilter } from './Exceptions/InternalServerErrorException';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new InternalServerErrorExceptionFilter(), new NotFoundExceptionFilter())
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  //app.setViewEngine('hbs')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  await app.listen(process.env.PORT);
}
bootstrap();
