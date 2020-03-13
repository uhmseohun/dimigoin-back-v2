import { Gender, UserType } from './Types';

interface IUser {
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
}

export default IUser;
