import HttpException from './HttpException'

export class AccessDeniedException extends HttpException {
  constructor (status: number = 403,
    message: string = '권한이 부족합니다.') {
    super(status, message)
  }
}
