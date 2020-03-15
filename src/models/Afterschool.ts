import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';
import { userSchema } from '../models/User';
import {
  ClassValues, GradeValues,
  AfterschoolTime, AfterschoolTimeValues,
  Day, DayValues } from '../types';

const afterschoolSchema = createSchema({
  name: Type.string({ required: true }),
  description: Type.string({ required: true }),

  // need validator
  time: Type.array().of(Type.number({ enum: AfterschoolTimeValues })),
  day: Type.array().of(Type.number({ enum: DayValues })),
  grade: Type.array().of(Type.number({ enum: GradeValues })),
  class: Type.array().of(Type.number({ enum: ClassValues })),

  key: Type.string(),
  teacher: Type.ref(Type.objectId()).to('User', userSchema),
  capacity: Type.number({ required: true }),
}, { versionKey: false, timestamps: true });

type AfterschoolDoc = ExtractDoc<typeof afterschoolSchema>;

const AfterschoolModel = typedModel('Afterschool', afterschoolSchema, undefined, undefined, {
  findByKey (key: string): AfterschoolDoc {
    return this.find({ key });
  },
  findByDayTime (day: Day, time: AfterschoolTime) {
    return this.find({ day, time });
  }
});

export {
  afterschoolSchema,
  AfterschoolModel,
};
