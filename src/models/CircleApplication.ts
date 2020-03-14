import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import {
  ICircleApplication,
  ICircleApplicationQuestion,
} from '../interfaces';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  maxLength: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

const applicationSchema = new mongoose.Schema({
  applier: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  form: {
    type: Object,
    required: true,
  },
  circle: {
    type: ObjectId,
    required: true,
    ref: 'Circle',
  },
  status: {
    type: String,
    required: true,
    default: 'applied',
    enum: ['applied', 'interview', 'pass', 'final', 'fail'],
  },
}, { versionKey: false });

const CircleApplicationQuestionModel = mongoose.model<ICircleApplicationQuestion & mongoose.Document>
  ('CircleApplicationQuestion', questionSchema);
const CircleApplicationModel = mongoose.model<ICircleApplication & mongoose.Document>
  ('CircleApplication', applicationSchema);

export {
  CircleApplicationQuestionModel,
  CircleApplicationModel,
};
