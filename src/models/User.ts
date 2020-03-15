import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserTypeValues, GradeValues, ClassValues } from '../interfaces/Types';

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

const UserModel = typedModel('User', userSchema);

export default UserModel;
