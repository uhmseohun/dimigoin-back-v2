import HttpException from './HttpException';

export class CircleNotFoundException extends Error {
  public status: number;
  public message: string;

  constructor(status: number = 404,
              message: string = '해당 동아리를 찾을 수 없습니다.') {
    super(message);
    this.status = status;
    this.message = message;
  }
}
