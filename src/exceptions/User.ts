import HttpException from './HttpException';

export class UserNotFoundException extends HttpException {
  constructor(status: number = 404,
              message: string = '해당 사용자를 찾을 수 없습니다.') {
    super(status, message);
  }
}

export class TeacherNotFoundException extends HttpException {
  constructor(status: number = 404,
              message: string = '해당 교사를 찾을 수 없습니다.') {
    super(status, message);
  }
}

export class StudentNotFoundException extends HttpException {
  constructor(status: number = 404,
              message: string = '해당 학생을 찾을 수 없습니다.') {
    super(status, message);
  }
}
