import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionService {
  public static throwBadRequest(message?: string) {
    throw new HttpException(
      message ? message : 'BAD REQUEST!',
      HttpStatus.BAD_REQUEST,
    );
  }

  public static throwInternalServerError(message?: string) {
    throw new HttpException(
      message ? message : 'INTERNAL SERVER ERROR!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  public static throwNotFound(message?: string) {
    throw new HttpException(
      message ? message : 'NOT FOUND!',
      HttpStatus.NOT_FOUND,
    );
  }
}
