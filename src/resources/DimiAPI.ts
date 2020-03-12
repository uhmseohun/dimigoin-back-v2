import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { IAccount, IUserIdentity } from '../interfaces/DimiAPI';

dotenv.config();

enum DimiAPIRouter {
  getIdentity = '/v1/users/identify',
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

  public restructureIdentity(identity: IUserIdentity) {
    return {
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
      ].filter((v) => v),
    };
  }

  private createAPIClient() {
    this.APIClient = axios.create({
      auth: this.authOption,
      baseURL: this.baseURL,
    });
  }
}
