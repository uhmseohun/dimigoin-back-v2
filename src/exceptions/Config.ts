import HttpException from './HttpException';

export class ConfigNotFoundException extends HttpException {
  constructor(status: number = 404,
              message: string = '해당 설정 변수를 찾을 수 없습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}
