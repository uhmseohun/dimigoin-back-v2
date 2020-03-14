import HttpException from './HttpException';

export class BodyValidationFailException extends HttpException {
  constructor(keys: string[]) {
    const message = `"${keys.join(', ')}" 항목이 전달되지 않았습니다.`
    super(400, message);
  }
}