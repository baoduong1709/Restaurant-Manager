import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n';
import { I18nContext } from 'nestjs-i18n';

import { BaseHttpException } from '../exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.logger.error(exception.stack);

    if (exception instanceof BadRequestException) {
      const responseData = exception.getResponse();
      return response.status(status).json({
        success: false,
        message: Array.isArray(responseData['message'])
          ? responseData['message'].join('\n')
          : responseData['message'],
        data: null,
      });
    } else if (exception instanceof BaseHttpException) {
      let responseData = exception.getResponse();
      responseData = responseData['response'] || responseData;
      return response.status(400).json({
        success: false,
        message:
          (Array.isArray(responseData['message'])
            ? responseData['message'].join('\n')
            : responseData['message']) || responseData,
        type: Array.isArray(responseData['type'])
          ? responseData['type'].join('\n')
          : responseData['type'],
        data: null,
        errorCode: exception.getErrorCode(),
        errorMessages: exception.getErrorMessages(),
      });
    } else if (exception instanceof UnauthorizedException) {
      return response.status(401).json({
        success: false,
        message: exception.message,
        data: null,
      });
    } else if (exception instanceof I18nValidationException) {
      const i18n = I18nContext.current(host);
      const errors = Object.values(exception.errors[0].constraints);
      const msg = errors.map((str) => i18n.translate(str)).join('\n');
      return response.status(status).json({
        success: false,
        message: msg,
        data: null,
      });
    } else {
      const responseData = exception.getResponse();
      return response.status(status).json({
        message: responseData['message'],
        error: exception.name,
        statusCode: status,
      });
    }
  }
}
