import mongoose from 'mongoose';
import { IUser } from '../interfaces';

const schema = new mongoose.Schema({
  idx: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: false,
    enum: ['S', 'O', 'D', 'T', 'P'],
  },

  grade: {
    type: Number,
  },
  class: {
    type: Number,
  },
  number: {
    type: Number,
  },
  serial: {
    type: String,
  },
}, { versionKey: false });

const UserModel = mongoose.model<IUser & mongoose.Document>('User', schema);

export default UserModel;
