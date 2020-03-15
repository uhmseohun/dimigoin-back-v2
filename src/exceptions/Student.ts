import HttpException from './HttpException'

export class StudentNotFoundException extends HttpException {
  constructor (status: number = 404,
    message: string = '해당 학생을 찾을 수 없습니다.') {
    super(status, message)
  }
}
