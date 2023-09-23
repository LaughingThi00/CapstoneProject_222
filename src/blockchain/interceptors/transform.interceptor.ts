import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const handler = ctx.getHandler().name;
        const controller = ctx.getClass().name;
        if (
          handler == 'findOne' &&
          (controller == 'NftMainnetController' ||
            controller == 'NftTestnetController')
        ) {
          return data;
        }

        if (
          handler == 'findAll' &&
          (controller == 'AssetsMainnetController' ||
            controller == 'AssetsTestnetController')
        ) {
          return data;
        }

        let message = 'OK';

        if (data?.message && data?.message != '') {
          message = data.message;
          data = data.data;
        }

        return {
          data,
          message,
          statusCode: 200,
        };
      }),
    );
  }
}
