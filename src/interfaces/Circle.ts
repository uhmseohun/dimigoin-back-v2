import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

interface ICircle {
  _id: ObjectId;
  name: string;
  imageKey?: string;
  category: string;
  description: string;
  chair: ObjectId;
}

export default ICircle;
