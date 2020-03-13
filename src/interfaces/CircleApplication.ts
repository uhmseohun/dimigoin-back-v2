import { Schema } from 'mongoose';

interface ICircleApplicationQuestion {
  question: string;
  maxLength: number;
}

interface ICircleApplicationForm {
  circle: Schema.Types.ObjectId;
  applier: Schema.Types.ObjectId;
  form: object;
}

export {
  ICircleApplicationQuestion,
  ICircleApplicationForm,
};
