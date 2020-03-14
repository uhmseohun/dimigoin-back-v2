export type Gender = 'M' | 'F';
export type UserType = 'S' | 'O' | 'D' | 'T' | 'P';
export type CircleApplicationStatus =
  'applied' | 'interview' | 'pass' | 'final' | 'fail';
  // 지원 완료 | 면접 대상 | 최종 합격 | 최종 선택 | 탈락
export enum ConfigKeys {
  circleAppliable = 'CIRCLE_APPLIABLE',
  circleMaxApply = 'CIRCLE_MAX_APPLY',
  circleCategory = 'CIRCLE_CATEGORY',
  imageExtension = 'IMAGE_EXTENSION',
  bucketURL = 'AWS_BUCKET_URL',
}
