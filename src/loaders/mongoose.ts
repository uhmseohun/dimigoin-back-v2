import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";

export default async (): Promise<Db> => {
  const { MONGO_ID, MONGO_PW, MONGO_PATH, MONGO_PORT, MONGO_NAME } = config;

  const mongooseOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  const connection = await mongoose.connect(
    `mongodb://${MONGO_PATH}:${MONGO_PORT}/${MONGO_NAME}`,
    mongooseOption
  );

  return connection.connection.db;
};
