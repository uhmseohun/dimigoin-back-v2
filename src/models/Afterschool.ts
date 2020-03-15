import { createSchema, Type, typedModel } from 'ts-mongoose';
import { GradeValues, ClassValues } from '../types';
import { userSchema } from '../models/User';

const afterschoolSchema = createSchema({
  name: Type.string({ required: true }),
  description: Type.string({ required: true }),
  grade: Type.array().of(Type.number({ required: true, enum: GradeValues })),
  class: Type.array().of(Type.number({ required: true, enum: ClassValues })),
  key: Type.string(),
  teacher: Type.ref(Type.objectId()).to('User', userSchema),
  capacity: Type.number({ required: true }),
})

const AfterschoolModel = typedModel('Afterschool', afterschoolSchema);

export {
  afterschoolSchema,
  AfterschoolModel,
};
