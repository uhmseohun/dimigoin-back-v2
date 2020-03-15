export enum ConfigKeys {
  circleAppliable = 'CIRCLE_APPLIABLE',
  circleMaxApply = 'CIRCLE_MAX_APPLY',
  circleCategory = 'CIRCLE_CATEGORY',
  imageExtension = 'IMAGE_EXTENSION',
  bucketURL = 'AWS_BUCKET_URL',
}

export const GenderValues = ['M', 'F'] as const
export type Gender = typeof GenderValues[number];

export const UserTypeValues = ['S', 'O', 'D', 'T', 'P'] as const
export type UserType = typeof UserTypeValues[number];

export const GradeValues = [1, 2, 3] as const
export type Grade = typeof GradeValues[number];

export const ClassValues = [1, 2, 3, 4, 5, 6] as const
export type Class = typeof ClassValues[number];

export const CircleApplicationStatusValues =
  ['applied', 'interview', 'pass', 'final', 'fail'] as const
// 지원 완료 | 면접 대상 | 최종 합격 | 최종 선택 | 탈락
export type CircleApplicationStatus =
  typeof CircleApplicationStatusValues[number];
