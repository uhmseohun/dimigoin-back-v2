import { Gender, UserType } from './Types';

interface IStudent {
  idx: number;
  username: string;
  email: string;
  name: string;
  grade: number;
  class: number;
  number: number;
  serial: string;
  nickname: string;
  gender: Gender;
  userType: UserType;
  birthdate: string;
  phone: string;
  photo: [string, string];
}

export default IStudent;
