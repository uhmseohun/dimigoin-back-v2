import { createSchema, Type, typedModel } from 'ts-mongoose';
import { ClassValues, GradeValues, UserTypeValues, UserType } from '../types';

const userSchema = createSchema({
  idx: Type.number({ required: true, unique: true }),
  username: Type.string({ required: true, unique: true }),
  name: Type.string({ required: true }),
  userType: Type.string({ required: true, enum: UserTypeValues }),
  grade: Type.number({ enum: GradeValues }),
  class: Type.number({ enum: ClassValues }),
  number: Type.number(),
  serial: Type.number(),
}, { versionKey: false, timestamps: true });

const UserModel = typedModel('User', userSchema, undefined, undefined, {
  findByIdx (idx: number) {
    return this.find({ idx });
  },
  findByUserType (userType: UserType[]) {
    return this.find({ userType: { $in: userType } });
  },
  findStudents () {
    // userType 'S'에는 졸업생도 포함되어 있어서 학년으로 재학생을 찾아야 함.
    return this.find({ grade: { $gte: 1, $lte: 3 } });
  },
  findTeachers () {
    return this.findByUserType(['D', 'T']);
  }
});

export { userSchema, UserModel };
