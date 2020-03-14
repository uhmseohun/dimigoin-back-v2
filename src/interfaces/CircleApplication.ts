import { ObjectId } from 'mongodb';

interface ICircleApplicationQuestion {
  question: string;
  maxLength: number;
}

interface ICircleApplicationForm {
  circle: ObjectId;
  applier: ObjectId;
  form: object;
  status?: string;
}

export {
  ICircleApplicationQuestion,
  ICircleApplicationForm,
};
