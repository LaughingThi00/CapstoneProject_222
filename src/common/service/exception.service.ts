import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionService {
  public static throwBadRequest() {
    throw new HttpException('BAD REQUEST!', HttpStatus.BAD_REQUEST);
  }

  public static throwInternalServerError() {
    throw new HttpException(
      'INTERNAL SERVER ERROR!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  public static throwNotFound() {
    throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND);
  }
}
