import { createSchema, Type, typedModel } from 'ts-mongoose';
import { userSchema } from './User';

const ingangApplicationSchema = createSchema(
  {
    time: Type.number({
      required: true,
      validate: (value: number) => value in [1, 2]
    }),
    date: Type.date({
      required: true,
      validate: (value: Date) => {
        const now = new Date();
        return (
          now.getFullYear() === value.getFullYear() &&
          now.getMonth() === value.getMonth() &&
          now.getDate() === value.getDate()
        );
      }
    }),
    applier: Type.ref(Type.objectId()).to('User', userSchema)
  },
  { versionKey: false, timestamps: true },
);

const IngangApplicationModel = typedModel('IngangApplication', ingangApplicationSchema);

export { ingangApplicationSchema, IngangApplicationModel };
