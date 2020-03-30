import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: process.env.SERVER_PORT,
  MONGO_ID: process.env.MONGO_ID,
  MONGO_PW: process.env.MONGO_PW,
  MONGO_PATH: process.env.MONGO_PATH,
  MONGO_NAME: process.env.MONGO_NAME,
  MONGO_PORT: process.env.MONGO_PORT,
  jwtSecret: process.env.JWT_SECRET,
  DIMIAPI_URL: process.env.DIMIAPI_URL,
  DIMIAPI_ID: process.env.DIMIAPI_ID,
  DIMIAPI_PW: process.env.DIMIAPI_PW,
};
