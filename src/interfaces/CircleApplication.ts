import { ObjectId } from 'mongodb';
import { CircleApplicationStatus } from '../types';

export interface ICircleApplicationQuestion {
  question: string;
  maxLength: number;
}

export interface ICircleApplicationForm {
  [key: string]: string;
}

export interface ICircleApplication {
  circle: ObjectId;
  applier: ObjectId;
  form: ICircleApplicationForm;
  status?: string;
}

export interface ICircleApplicationSetStatus {
  applierId: string;
  status: CircleApplicationStatus;
}

export interface ISetApplicationInterviewTime {
  applierId: string;
  interviewTime: string;
}

export interface ISetFinalCircle {
  circle: ObjectId;
}
