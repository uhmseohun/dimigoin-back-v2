import { createSchema, Type, typedModel } from 'ts-mongoose';
import { CircleApplicationStatusValues } from '../Types';
import { circleSchema } from './Circle';
import { userSchema } from './User';

const circleApplicationQuestionSchema = createSchema({
  question: Type.string({ required: true, trim: true, unique: true }),
  maxLength: Type.number({ required: true }),
}, { versionKey: false, timestamps: true });

const circleApplicationSchema = createSchema({
  applier: Type.ref(Type.objectId()).to('User', userSchema),
  form: Type.mixed({ required: true }),
  circle: Type.ref(Type.objectId()).to('Circle', circleSchema),
  status: Type.string({
    required: true,
    default: 'applied',
    enum: CircleApplicationStatusValues,
  }),
}, { versionKey: false, timestamps: true });

const CircleApplicationQuestionModel =
  typedModel('CircleApplicationQuestion', circleApplicationQuestionSchema);
const CircleApplicationModel =
  typedModel('CircleApplication', circleApplicationSchema);

export {
  circleApplicationQuestionSchema,
  circleApplicationSchema,
  CircleApplicationQuestionModel,
  CircleApplicationModel,
};
