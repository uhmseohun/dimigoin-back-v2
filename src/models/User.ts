import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';
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

type UserDoc = ExtractDoc<typeof userSchema>;

const UserModel = typedModel('User', userSchema, undefined, undefined, {
  findByIdx (idx: number): UserDoc {
    return this.find({ idx });
  },
  findByUserType (userType: UserType[]): UserDoc[] {
    return this.find({ userType: { $in: userType } });
  },
  findStudents (): UserDoc[] {
    // userType 'S'에는 졸업생도 포함되어 있어서 학년으로 재학생을 찾아야 함.
    return this.find({ grade: { $gte: 1, $lte: 3 } });
  },
  findTeachers (): UserDoc[] {
    return this.findByUserType(['D', 'T']);
  }
});

export { userSchema, UserModel };
