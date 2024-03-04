import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception?.message || 'Internal server error';
    const resObject: any =
      exception instanceof HttpException ? exception?.getResponse() : null;

    if (req.path !== '/') {
      this.logger.error(
        resObject
          ? `[${req.method}] ${req.path} [RESPONSE] ${JSON.stringify(resObject)} [STACK] ${exception?.stack}`
          : `[STACK] ${exception.stack}`,
      );
    }

    res.status(status).json({
      message,
      timestamp: new Date().toISOString(),
      errors: resObject?.error || resObject?.message,
    });
  }
}
