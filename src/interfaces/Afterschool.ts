import { ObjectID } from 'mongodb';
import { Class, Grade, Day, AfterschoolTime } from '../types';

interface IAfterschool {
  _id: ObjectID;
  name: string;
  description: string;
  day: Day[];
  time: AfterschoolTime[];
  grade: Grade[];
  class: Class[];
  key?: string; // 동시 수강 강좌 처리
  teacher: ObjectID;
  capacity: number;
}

export default IAfterschool;
