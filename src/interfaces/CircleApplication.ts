import { Schema } from 'mongoose';

interface ICircleApplicationQuestion {
  question: string;
  maxLength: number;
}

interface ICircleApplicationForm {
  circle: Schema.Types.ObjectId;
  applier: string;
  form: object;
}

export {
  ICircleApplicationQuestion,
  ICircleApplicationForm,
};
