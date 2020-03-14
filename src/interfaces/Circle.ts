import { Schema } from 'mongoose';

interface ICircle {
  _id: Schema.Types.ObjectId;
  name: string;
  imageKey?: string;
  category: string;
  description: string;
  chair: Schema.Types.ObjectId;
}

export default ICircle;
