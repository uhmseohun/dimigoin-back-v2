import mongoose from 'mongoose';
import { ICircle } from '../interfaces';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'IT(보안)', 'IT(로봇)', 'IT(인공지능)', 'IT(프로젝트)', 'IT(알고리즘)', 'IT(개발)',
      'IT(게임개발)', 'IT(코딩교육)', 'IT(스마트팜)', '강연', '영상', '그래픽', '상업(경제)',
      '상업(기업)', '작곡', '평론', '언어', '수학(미적분)'
    ],
  },
  description: {
    type: String,
    required: true,
  },
  chair: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

const UserModel = mongoose.model<ICircle & mongoose.Document>('Circle', schema);

export default UserModel;
