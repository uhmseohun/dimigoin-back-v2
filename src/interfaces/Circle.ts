import { ObjectId } from 'mongodb'

export default interface ICircle {
  _id: ObjectId;
  name: string;
  imageKey?: string;
  category: string;
  description: string;
  chair: ObjectId;
}
