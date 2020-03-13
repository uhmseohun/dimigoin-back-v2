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
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['M', 'F'],
  },
  userType: {
    type: String,
    required: true,
    enum: ['S', 'O', 'D', 'T', 'P'],
  },
  birthdate: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: Array,
    required: true,
  },
});

const UserModel = mongoose.model<IUser & mongoose.Document>('User', schema);

export default UserModel;
