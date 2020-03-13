import { Schema } from 'mongoose';
import { CircleCategory } from '../interfaces/Types';

interface ICircle {
  _id: Schema.Types.ObjectId;
  name: string;
  category: CircleCategory;
  description: string;
  chair: string; // serial
}

export default ICircle;
