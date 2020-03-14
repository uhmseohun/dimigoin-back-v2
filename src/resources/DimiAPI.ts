import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { IUser } from '../interfaces';
import { IAccount, IStudentIdentity, IUserIdentity } from '../interfaces/DimiAPI';
import { UserModel } from '../models';

dotenv.config();

enum DimiAPIRouter {
  getIdentity = '/v1/users/identify',
  getAllUsers = '/v1/users',
  getAllStudents = '/v1/user-students',
}

export default class DimiAPI {
  private baseURL = process.env.DIMIAPI_URL;
  private authOption = {
    username: process.env.DIMIAPI_ID,
    password: process.env.DIMIAPI_PW,
  };
  private APIClient: AxiosInstance;

  constructor() {
    this.createAPIClient();
  }

  public async getIdentity(account: IAccount) {
    const { data } = await this.APIClient.get(DimiAPIRouter.getIdentity, {
      params: account,
    });
    return data;
  }

  public restructureUserIdentity(identity: IUserIdentity) {
    return {
      _id: identity._id,
      idx: identity.id,
      nickname: identity.nick,
      username: identity.username,
      name: identity.name,
      email: identity.email,
      gender: identity.gender,
      userType: identity.user_type,
      birthdate: identity.birthdate,
      phone: identity.phone,
      photo: [
        identity.photofile1,
        identity.photofile2,
      ].filter(v => v),
    };
  }

  public async reloadAllUsers() {
    const { data: users } = await this.APIClient.get(DimiAPIRouter.getAllUsers);
    await UserModel.deleteMany({});
    Object.keys(users).forEach(async (idx) => {
      users[idx] =
        this.restructureUserIdentity(users[idx]);
      await UserModel.create(users[idx]).catch((e) => console.error(e));
    });
  }

  public async attachStudentInfo() {
    const { data } = await this.APIClient.get(DimiAPIRouter.getAllStudents);
    const students: IStudentIdentity[] = data;
    await Promise.all(
      students.map(async (student: IStudentIdentity) => {
        await UserModel.updateOne({ idx: student.user_id }, {
          grade: student.grade,
          class: student.class,
          number: student.number,
          serial: student.serial,
        });
        return student;
      }),
    );
  }

  private createAPIClient() {
    this.APIClient = axios.create({
      auth: this.authOption,
      baseURL: this.baseURL,
    });
  }
}
