import { ObjectId } from 'mongodb';
import { UserType } from '../Types';

interface IUser {
  _id: ObjectId;
  idx: number;
  username: string;
  name: string;
  userType: UserType;

  grade?: number;
  class?: number;
  number?: number;
  serial?: number;
}

export default IUser;
