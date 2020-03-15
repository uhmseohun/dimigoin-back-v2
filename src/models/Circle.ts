import { ConfigKeys } from '../interfaces/Types';
import { ConfigModel } from './Config';
import { createSchema, Type, typedModel } from 'ts-mongoose';
import { userSchema } from './User';

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

const CircleModel = typedModel('Circle', circleSchema);

export {
  circleSchema,
  CircleModel,
};
