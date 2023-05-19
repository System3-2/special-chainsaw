
// CustomGlobalFilter.ts
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { NotFoundExceptionFilter } from './NotFoundException';
import { InternalServerErrorExceptionFilter } from './InternalServerErrorException'

@Catch()
export class CustomGlobalFilter {
  private firstFilter: NotFoundExceptionFilter;
  private secondFilter: NotFoundExceptionFilter;

  constructor() {
    this.firstFilter = new NotFoundExceptionFilter();
    this.secondFilter = new InternalServerErrorExceptionFilter();
  }

  catch(exception: any, host: ArgumentsHost) {
  }
}
