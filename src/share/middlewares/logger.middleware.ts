import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('[REQUEST]');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, url } = req;

    const { statusCode } = res;

    this.logger.log(
      `${method} ${url} ${statusCode} - BODY: ${JSON.stringify(req.body)} - PARAM: ${JSON.stringify(req.params)}`,
    );

    next();
  }
}
