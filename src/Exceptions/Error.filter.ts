import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status = exception.getStatus();

    if (status === HttpStatus.NOT_FOUND) {
      // Handle 404 errors
      return response.render('404'); // Replace with your custom page rendering logic
    } else {
      // Handle other HTTP exceptions
      return response.render('500'); // Replace with your custom page rendering logic
    }
  }
}
