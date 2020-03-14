import mongoose, { Schema } from 'mongoose';
import { ICircle } from '../interfaces';
import { ConfigKeys } from '../interfaces/Types';
import ConfigModel from './Config';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  imageKey: {
    type: String,
  },
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
    }
  },
  description: {
    type: String,
    required: true,
  },
  chair: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { versionKey: false });

const UserModel = mongoose.model<ICircle & mongoose.Document>('Circle', schema);

export default UserModel;
