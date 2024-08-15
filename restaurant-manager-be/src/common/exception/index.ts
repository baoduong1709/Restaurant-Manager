import { HttpException } from '@nestjs/common';

import { CustomErrorCode, HttpMessage } from '../enum';

export abstract class BaseHttpException extends HttpException {
  errorCode: string = CustomErrorCode.BaseHttpException;
  errorMessages: object[] = [];

  constructor(message?: string | Record<string, unknown>, status?: number) {
    super(message || HttpMessage.FAILURE, status || 400);
  }

  getErrorCode() {
    return this.errorCode;
  }

  getErrorMessages() {
    return this.errorMessages;
  }

  setErrorCode(errorCode: string) {
    this.errorCode = errorCode;
  }

  setErrorMessages(errorMessages: object[]) {
    this.errorMessages = errorMessages;
  }
}

export class CustomErrorException extends BaseHttpException {
  constructor(message: string, statusCode?: number, errorCode?: string, errorMessages?: object[]) {
    super(message, statusCode);
    super.setErrorCode(errorCode);
    super.setErrorMessages(errorMessages);
  }
}

export class AccountNotActiveException extends BaseHttpException {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    super.setErrorCode(CustomErrorCode.AccountNotActiveException);
  }
}

export class AccountExistedException extends BaseHttpException {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    super.setErrorCode(CustomErrorCode.AccountExistedException);
  }
}

export class AccountNotExistedException extends BaseHttpException {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    super.setErrorCode(CustomErrorCode.AccountNotExistedException);
  }
}

export class TokenInvalidException extends BaseHttpException {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    super.setErrorCode(CustomErrorCode.TokenInvalidException);
  }
}

export class PasswordNotSetupException extends BaseHttpException {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    super.setErrorCode(CustomErrorCode.PasswordNotSetupException);
  }
}

export class PasswordIncorrectException extends BaseHttpException {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    super.setErrorCode(CustomErrorCode.PasswordIncorrectException);
  }
}

export class JwtTokenInvalidException extends BaseHttpException {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    super.setErrorCode(CustomErrorCode.JwtTokenInvalidException);
  }
}

export class ParamsInvalidException extends BaseHttpException {
  constructor(message: string | Record<string, unknown>, statusCode?: number) {
    super(message, statusCode);
    super.setErrorCode(CustomErrorCode.ParamsInvalidException);
  }
}
export class BaseException extends BaseHttpException {
  constructor(message: string | Record<string, unknown>, statusCode?: number) {
    super(message, statusCode);
  }
}
