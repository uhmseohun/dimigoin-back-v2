export type Gender = 'M' | 'F';
export type UserType = 'S' | 'O' | 'D' | 'T' | 'P';
export type CircleApplicationStatus =
  'none' | 'applied' | 'interview' | 'pass' | 'final' | 'fail';
export enum ConfigKeys {
  circleAppliable = 'CIRCLE_APPLIABLE',
  circleMaxApply = 'CIRCLE_MAX_APPLY',
}
