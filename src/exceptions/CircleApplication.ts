import HttpException from './HttpException';

export class CircleApplicationLimitException extends HttpException {
  constructor(status: number = 423,
              message: string = '지원 가능한 동아리 개수를 초과해 지원했습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class CircleApplicationQuestionException extends HttpException {
  constructor(status: number = 400,
              message: string = '지원서 양식이 올바르지 않습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class CircleApplicationDeadlineException extends HttpException {
  constructor(status: number = 423,
              message: string = '동아리 지원 기간이 아닙니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class CircleApplicationNotFoundException extends HttpException {
  constructor(status: number = 404,
              message: string = '해당 지원서가 존재하지 않습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class ConflictedCircleApplicationException extends HttpException {
  constructor(status: number = 409,
              message: string = '같은 동아리에 두 번 이상 지원할 수 없습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class NotPassedCircleSelectionException extends HttpException {
  constructor(status: number = 403,
              message: string = '합격한 동아리에만 최종 선택을 할 수 있습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class MaxLengthOverFormException extends HttpException {
  constructor(status: number = 400,
              message: string = '지원서 최대 글자 제한을 초과했습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}
