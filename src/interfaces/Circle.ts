import { Schema } from 'mongoose';

interface ICircle {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  chair: string; // serial
}

export default ICircle;
