import mongoose from 'mongoose';
import { ICircle } from '../interfaces';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  chair: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model<ICircle & mongoose.Document>('Circle', schema);

export default UserModel;
