import { Schema } from 'mongoose';
import { CircleCategory } from '../interfaces/Types';

interface ICircle {
  _id: Schema.Types.ObjectId;
  name: string;
  imageKey?: string;
  category: CircleCategory;
  description: string;
  chair: Schema.Types.ObjectId;
}

export default ICircle;
