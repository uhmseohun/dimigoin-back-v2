import mongoose from 'mongoose';
import { IConfig } from '../interfaces';

const schema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    trim: true,
  },
  value: {},
});

const ConfigModel = mongoose.model<IConfig & mongoose.Document>('Config', schema);

export default ConfigModel;
