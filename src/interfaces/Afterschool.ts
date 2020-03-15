import { ObjectID } from 'mongodb'
import { Class, Grade } from '../types'

export default interface IAfterschool {
  _id: ObjectID;
  name: string;
  description: string;
  grade: Grade[];
  class: Class[];
  key?: string; // 동시 수강 강좌 처리
  teacher: ObjectID;
  capacity: number;
}
