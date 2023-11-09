import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { error } from 'console';
import { Response } from 'express';
import { IError } from 'src/interface/error.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    const responseBody: IError = {
      status_code: status,
      message: message,
      timestamp: new Date().toISOString(),
      error: exception,
    };

    response.status(status).json(responseBody);
  }
}
