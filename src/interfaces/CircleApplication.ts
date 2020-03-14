import { ObjectId } from 'mongodb';

interface ICircleApplicationQuestion {
  question: string;
  maxLength: number;
}

interface ICircleApplicationForm {
  circle: ObjectId;
  applier: ObjectId;
  form: any;
  status?: string;
}

export {
  ICircleApplicationQuestion,
  ICircleApplicationForm,
};
