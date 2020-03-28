import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  const mongooseOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  const connection = await mongoose.connect(`mongodb://${config.MONGO_PATH}:${config.MONGO_PORT}/${config.MONGO_NAME}`, mongooseOption);
  return connection.connection.db;
};
