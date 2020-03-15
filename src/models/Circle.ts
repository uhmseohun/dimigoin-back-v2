import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';
import { ConfigKeys } from '../types';
import { ConfigModel } from './Config';
import { userSchema } from './User';
import { ObjectId } from 'mongodb';

const circleSchema = createSchema({
  name: Type.string({ required: true, unique: true, trim: true }),
  imageKey: Type.string(),
  description: Type.string({ required: true }),
  chair: Type.ref(Type.objectId()).to('User', userSchema),
  category: {
    type: String,
    required: true,
    validate: {
      validator: async (value: string) => {
        const { value: category } =
          await ConfigModel.findOne({ key: ConfigKeys.circleCategory });
        return category.includes(value);
      },
      message: '유효하지 않은 동아리 분류입니다.',
    },
  },
}, { versionKey: false, timestamps: true });

type CircleDoc = ExtractDoc<typeof circleSchema>;

const CircleModel = typedModel('Circle', circleSchema, undefined, undefined, {
  findByChair (chair: ObjectId): CircleDoc {
    return this.findOne({ chair });
  }
});

export {
  circleSchema,
  CircleModel,
};
