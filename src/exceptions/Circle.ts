import HttpException from './HttpException';

export class CircleNotFoundException extends HttpException {
  constructor(status: number = 404,
              message: string = '해당 동아리를 찾을 수 없습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

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
