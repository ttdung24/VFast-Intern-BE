import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TranformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(TranformInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request: Request = context.switchToHttp().getResponse();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.log(
            request?.method !== 'GET'
              ? `URL: ${request?.url} ${JSON.stringify(data)} ${Date.now() - now}ms`
              : `URL: ${request?.url} ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
