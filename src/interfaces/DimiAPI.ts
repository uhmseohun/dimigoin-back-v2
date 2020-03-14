import { ObjectId } from 'mongodb';
import {
  Gender as gender,
  UserType as user_type,
} from './Types';

export interface IAccount {
  username: string;
  password: string;
}

export interface IUserIdentity {
  _id: ObjectId;
  id: number;
  username: string;
  email: string;
  name: string;
  nick: string;
  gender: gender;
  user_type: user_type;
  birthdate: string;
  phone: string;
  photofile1: string;
  photofile2: string;
}

export interface IStudentIdentity {
  user_id: number;
  username: string;
  email: string;
  name: string;
  grade: number;
  class: number;
  number: number;
  serial: number;
  nick: string;
  gender: gender;
  user_type: user_type;
  birthdate: string;
  phone: string;
  photofile1: string;
  photofile2: string;
}
