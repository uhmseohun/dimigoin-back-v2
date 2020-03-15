import HttpException from './HttpException'

export class CircleNotFoundException extends HttpException {
  constructor (status: number = 404,
    message: string = '해당 동아리를 찾을 수 없습니다.') {
    super(status, message)
  }
}

export class ImageNotAttachedException extends HttpException {
  constructor (status: number = 400,
    message: string = '동아리의 이미지가 첨부되지 않았습니다.') {
    super(status, message)
  }
}
