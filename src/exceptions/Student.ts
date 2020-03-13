import HttpException from './HttpException';

export class StudentNotFoundException extends Error {
  public status: number;
  public message: string;

  constructor(status: number = 404,
              message: string = '해당 학생을 찾을 수 없습니다.') {
    super(message);
    this.status = status;
    this.message = message;
  }
}
