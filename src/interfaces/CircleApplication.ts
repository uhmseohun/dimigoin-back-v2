import { ObjectId } from 'mongodb';

interface ICircleApplicationQuestion {
  question: string;
  maxLength: number;
}

interface ICircleApplicationForm {
  [key: string]: string;
}

interface ICircleApplication {
  circle: ObjectId;
  applier: ObjectId;
  form: ICircleApplicationForm;
  status?: string;
}

export {
  ICircleApplicationQuestion,
  ICircleApplication,
  ICircleApplicationForm,
};
