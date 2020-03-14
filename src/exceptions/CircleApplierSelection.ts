import HttpException from './HttpException';

export class AlreadySelectedApplierException extends HttpException {
  constructor(status: number = 409,
              message: string = '이미 최종 결정을 한 지원자입니다.') {
    super(status, message);
  }
}

export class AlreadyFailedApplierException extends HttpException {
  constructor(status: number = 403,
              message: string = '이미 1차 전형을 탈락한 지원자입니다.') {
    super(status, message);
  }
}

export class AlreadyPassedApplierException extends HttpException {
  constructor(status: number = 403,
              message: string = '이미 면접을 통과한 지원자입니다.') {
    super(status, message);
  }
}

export class AlreadyInterviewerException extends HttpException {
  constructor(status: number = 403,
              message: string = '이미 면접 대상자로 선정된 지원자입니다.') {
    super(status, message);
  }
}

export class NeedGraduallyStatusSet extends HttpException {
  constructor(status: number = 403,
              message: string = '한 번에 한 단계로만 진행시킬 수 있습니다.') {
    super(status, message);
  }
}
