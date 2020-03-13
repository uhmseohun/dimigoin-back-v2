import { Schema } from 'mongoose';
import { Gender, UserType } from './Types';

interface IUser {
  _id: Schema.Types.ObjectId;
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
