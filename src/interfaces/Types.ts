export type Gender = 'M' | 'F';
export type UserType = 'S' | 'O' | 'D' | 'T' | 'P';
export type CircleApplicationStatus =
  'applied' | 'interview' | 'pass' | 'final' | 'fail';
  // 지원 완료 | 면접 대상 | 최종 합격 | 최종 선택 | 탈락
export type CircleCategory =
  'IT(보안)' | 'IT(로봇)' | 'IT(인공지능)' | 'IT(프로젝트)' | 'IT(알고리즘)' | 'IT(개발)' |
  'IT(게임개발)' | 'IT(코딩교육)' | 'IT(스마트팜)' | '강연' | '영상' | '그래픽' | '상업(경제)' |
  '상업(기업)' | '작곡' | '평론' | '언어' | '수학(미적분)';
export enum ConfigKeys {
  circleAppliable = 'CIRCLE_APPLIABLE',
  circleMaxApply = 'CIRCLE_MAX_APPLY',
  imageExtension = 'IMAGE_EXTENSION',
}
