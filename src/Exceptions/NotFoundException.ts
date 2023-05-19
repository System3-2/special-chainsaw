import { NotFoundException, Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    response.render('404', {
      message: 'oops not what you\'re looking for 😔'
    })
  }
}
