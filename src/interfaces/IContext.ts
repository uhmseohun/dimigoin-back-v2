import IUser from "./User";

export interface IContext {
  isLogin: boolean;
  user: IUser;
}
