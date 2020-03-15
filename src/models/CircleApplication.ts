import { createSchema, Type, typedModel } from 'ts-mongoose';
import { userSchema } from './User';
import { CircleApplicationStatusValues } from '../interfaces/Types'

const circleApplicationQuestionSchema = createSchema({
  question: Type.string({ required: true, trim: true, unique: true }),
  maxLength: Type.number({ required: true }),
}, { versionKey: false, timestamps: true });

const circleApplicationSchema = createSchema({
  applier: Type.ref(Type.objectId()).to('User', userSchema),
  form: Type.object({ required: true }),
  circle: Type.ref(Type.objectId()).to('Circle', circleSchema),
  status: Type.string({
    required: true,
    default: 'applied',
    enum: CircleApplicationStatusValues
  }),
}, { versionKey: false });

const CircleApplicationQuestionModel =
  typedModel('CircleApplicationQuestion', circleApplicationQuestionSchema);
const CircleApplicationModel = typedModel('CircleApplication', circleApplicationSchema);

export {
  circleApplicationQuestionSchema,
  circleApplicationSchema,
  CircleApplicationQuestionModel,
  CircleApplicationModel,
};
