import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { Account, UserIdentity } from '../interfaces/DimiAPI';

dotenv.config();

enum DimiAPIRouter {
  getIdentity = '/v1/users/identify',
}

export default class DimiAPI {
  private baseURL = process.env.DIMIAPI_URL;
  private authOption = {
    username: process.env.DIMIAPI_ID,
    password: process.env.DIMIAPI_PW // tslint:disable-line
  };
  private APIClient: AxiosInstance;

  constructor() {
    this.createAPIClient();
  }

  public async getIdentity(account: Account) {
    const { data } = await this.APIClient.get(DimiAPIRouter.getIdentity, {
      params: account,
    });
    return data;
  }

  public restructureIdentity(identity: UserIdentity) {
    return {
      email: identity.email,
      idx: identity.id,
      username: identity.username,
      name: identity.name,
      nickname: identity.nick,
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

  private createAPIClient() {
    this.APIClient = axios.create({
      auth: this.authOption,
      baseURL: this.baseURL,
    });
  }
}
