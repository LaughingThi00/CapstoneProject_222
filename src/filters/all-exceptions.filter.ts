import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {
    //do something
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    console.log('exception:', exception.getResponse());
    const message = exception.message;
    // const exceptionResponse = exception.getResponse();
    // if (exceptionResponse instanceof Object) {
    // message = exceptionResponse.message[0];
    // }

    response.status(200).json({ statusCode, message, data: null });
  }
}
