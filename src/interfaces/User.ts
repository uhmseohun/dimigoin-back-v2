import { ObjectId } from 'mongodb';
import { Gender, UserType } from './Types';

interface IUser {
  _id: ObjectId;
  idx: number;
  username: string;
  email: string;
  name: string;
  nickname: string;
  gender: Gender;
  userType: UserType;
  birthdate: string;
  phone: string;
  photo: [string, string];

  grade?: number;
  class?: number;
  number?: number;
  serial?: string;
}

export default IUser;
