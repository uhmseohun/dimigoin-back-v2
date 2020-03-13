import mongoose, { Schema } from 'mongoose';
import {
  ICircleApplicationForm,
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
});

const formSchema = new mongoose.Schema({
  applier: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  circle: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'none',
    enum: ['none', 'applied', 'interview', 'pass', 'final', 'fail'],
  },
});

const CircleApplicationQuestionModel = mongoose.model<ICircleApplicationQuestion & mongoose.Document>
  ('CircleApplicationQuestion', questionSchema);
const CircleApplicationFormModel = mongoose.model<ICircleApplicationForm & mongoose.Document>
  ('CircleApplicationForm', formSchema);

export {
  CircleApplicationQuestionModel,
  CircleApplicationFormModel,
};
