import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpMessage } from '../../enum';
import { Response } from '../interface/response.interface';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode:
          context.switchToHttp().getResponse().statusCode || HttpStatus.OK,
        success: data?.success || true,
        data,
        message: data?.message || HttpMessage.SUCCESS,
        meta: data?.meta,
      })),
    );
  }
}
