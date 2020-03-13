import mongoose from 'mongoose';
import { IConfig } from '../interfaces';

const schema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    trim: true,
  },
  value: {},
}, { versionKey: false });

const ConfigModel = mongoose.model<IConfig & mongoose.Document>('Config', schema);

export default ConfigModel;
