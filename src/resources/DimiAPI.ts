import axios  from "axios";
import {
  IAccount,
  IStudentIdentity,
  IUserIdentity
} from "../interfaces/DimiAPI";
import { UserModel } from "../models";
import config from "../config";

const DimiAPIRouter = {
  getIdentity: "/v1/users/identify",
  getAllUsers: "/v1/users",
  getAllStudents: "/v1/user-students"
};

const api = axios.create({
  auth: {
    username: config.DIMIAPI_ID,
    password: config.DIMIAPI_PW
  },
  baseURL: config.DIMIAPI_URL
});

export default {
  async getIdentity(account: IAccount) {
    const { data } = await api.get(DimiAPIRouter.getIdentity, {
      params: account
    });
    return data;
  },

  restructureUserIdentity(identity: IUserIdentity) {
    return {
      idx: identity.id,
      username: identity.username,
      name: identity.name,
      userType: identity.user_type,
      gender: identity.gender,
      phone: identity.phone,
      photo: [identity.photofile1, identity.photofile2].filter(v => v)
    };
  },

  async attachStudentInfo() {
    const { data } = await api.get(DimiAPIRouter.getAllStudents);
    const students: IStudentIdentity[] = data;
    await Promise.all(
      students.map(async student => {
        await UserModel.updateOne(
          { idx: student.user_id },
          {
            grade: student.grade,
            class: student.class,
            number: student.number,
            serial: Number(student.serial)
          }
        );
        return student;
      })
    );
  }
};
