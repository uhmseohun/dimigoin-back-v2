import HttpException from './HttpException'

export class AuthFailException extends HttpException {
  constructor (code: number = 404,
    message: string = '인증을 실패했습니다.') {
    super(code, message)
  }
}
