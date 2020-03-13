import HttpException from './HttpException';

export class UserNotFoundException extends HttpException {
  constructor(status: number = 404,
              message: string = '해당 사용자를 찾을 수 없습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}
