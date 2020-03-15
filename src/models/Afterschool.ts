import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';
import { userSchema } from '../models/User';
import {
  ClassValues, GradeValues, Grade, Class,
  AfterschoolTime as Time,
  AfterschoolTimeValues as TimeValues,
  Day, DayValues } from '../types';

const afterschoolSchema = createSchema({
  name: Type.string({ required: true }),
  description: Type.string({ required: true }),
  key: Type.string(),
  teacher: Type.ref(Type.objectId()).to('User', userSchema),
  capacity: Type.number({ required: true }),

  time: Type.array({
    validate: (value: Time[]) => value.length > 0,
  }).of(Type.number({ enum: TimeValues })),
  day: Type.array({
    validate: (value: Day[]) => value.length > 0,
  }).of(Type.string({ enum: DayValues })),
  grade: Type.array({
    validate: (value: Grade[]) => value.length > 0,
  }).of(Type.number({ enum: GradeValues })),
  class: Type.array({
    validate: (value: Class[]) => value.length > 0,
  }).of(Type.number({ enum: ClassValues })),
}, { versionKey: false, timestamps: true });

type AfterschoolDoc = ExtractDoc<typeof afterschoolSchema>;

const AfterschoolModel = typedModel('Afterschool', afterschoolSchema, undefined, undefined, {
  findByKey (key: string): AfterschoolDoc {
    return this.find({ key });
  },
  findByDayTime (day: Day, time: Time) {
    return this.find({ day, time });
  }
});

export {
  afterschoolSchema,
  AfterschoolModel,
};
