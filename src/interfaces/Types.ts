export type Gender = 'M' | 'F';
export type UserType = 'S' | 'O' | 'D' | 'T' | 'P';
export type CircleApplicationStatus =
  'none' | 'applied' | 'interview' | 'pass' | 'final' | 'fail';
export type CircleCategory =
  'IT(보안)' | 'IT(로봇)' | 'IT(인공지능)' | 'IT(프로젝트)' | 'IT(알고리즘)' | 'IT(개발)' |
  'IT(게임개발)' | 'IT(코딩교육)' | 'IT(스마트팜)' | '강연' | '영상' | '그래픽' | '상업(경제)' |
  '상업(기업)' | '작곡' | '평론' | '언어' | '수학(미적분)';
export enum ConfigKeys {
  circleAppliable = 'CIRCLE_APPLIABLE',
  circleMaxApply = 'CIRCLE_MAX_APPLY',
}
