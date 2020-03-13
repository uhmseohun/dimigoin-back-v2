import mongoose from 'mongoose';
import { IStudent } from '../interfaces';

/**
 * 교내 API의 문제로 성별, 별명 등이 Null인 경우가 있어 임시적으로 required를 해제함.
 */

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
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    // required: false,
    // enum: ['M', 'F'],
  },
  userType: {
    type: String,
    required: false,
    enum: ['S', 'O', 'D', 'T', 'P'],
  },
  birthdate: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  photo: {
    type: Array,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  class: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  serial: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const UserModel = mongoose.model<IStudent & mongoose.Document>('Student', schema);

export default UserModel;
