import HttpException from './HttpException'

export class AlreadySelectedApplierException extends HttpException {
  constructor (status: number = 409,
    message: string = '이미 최종 결정을 한 지원자입니다.') {
    super(status, message)
  }
}

export class CircleApplicationStatusException extends HttpException {
  constructor (status: number = 403,
    message: string = '현재 지원자의 상태로 설정할 수 없는 상태입니다.') {
    super(status, message)
  }
}
