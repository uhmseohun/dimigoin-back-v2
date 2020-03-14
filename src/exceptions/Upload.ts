import HttpException from './HttpException';

export class NotAllowedExtensionException extends HttpException {
  constructor(status: number = 400,
              message: string = '허용되지 않은 확장자 형식의 파일입니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class S3UploadFailException extends HttpException {
  constructor(status: number = 500,
              message: string = '업로드 파일을 버킷으로 이동하던 중 오류가 발생했습니다.') {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}
