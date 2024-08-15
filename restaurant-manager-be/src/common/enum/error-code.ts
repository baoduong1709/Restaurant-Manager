export enum CustomErrorCode {
  BaseHttpException = 'E0000',
  AccountNotActiveException = 'E0001',
  AccountExistedException = 'E0002',
  AccountNotExistedException = 'E0003',
  TokenInvalidException = 'E0004',
  PasswordNotSetupException = 'E0005',
  PasswordIncorrectException = 'E0006',
  JwtTokenInvalidException = 'E0007',
  VerifySetPwdExpiredTimeException = 'E0008',
  CreateRoleException = 'E0009',
  ParamsInvalidException = 'E9999',
}
