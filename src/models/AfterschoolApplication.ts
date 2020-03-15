import { createSchema, Type, typedModel } from 'ts-mongoose';
import { afterschoolSchema } from './Afterschool';
import { userSchema } from './User';

const afterschoolApplicationSchema = createSchema({
  afterschool: Type.ref(Type.objectId()).to('Afterschool', afterschoolSchema),
  applier: Type.ref(Type.boolean()).to('User', userSchema),
}, { versionKey: false, timestamps: true });

const AfterschoolApplicationModel =
  typedModel('AfterschoolApplication', afterschoolSchema);

export {
  afterschoolApplicationSchema,
  AfterschoolApplicationModel,
};
