import { createSchema, Type, typedModel } from 'ts-mongoose';
import { ObjectId } from 'mongodb';
import { afterschoolSchema } from './Afterschool';
import { userSchema } from './User';

const afterschoolApplicationSchema = createSchema({
  afterschool: Type.ref(Type.objectId()).to('Afterschool', afterschoolSchema),
  applier: Type.ref(Type.boolean()).to('User', userSchema),
}, { versionKey: false, timestamps: true });

const AfterschoolApplicationModel =
  typedModel('AfterschoolApplication', afterschoolSchema, undefined, undefined, {
    findByApplier (applier: ObjectId) {
      return this.find({ applier });
    }
  });

export {
  afterschoolApplicationSchema,
  AfterschoolApplicationModel,
};
