import HttpException from './HttpException'

export class TokenVerifyFailException extends HttpException {
  constructor (code: number = 401,
    message: string = '토큰에 문제가 있습니다.') {
    super(code, message)
  }
}
