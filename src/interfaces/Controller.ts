import { NextFunction, Request, Response, Router } from 'express';
import { IConfig } from '../interfaces';
import { ConfigModel } from '../models';
import Token from '../resources/Token';
import IUser from './User';

const TokenManager = new Token();

const asyncWrapper = (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

const getUserIdentity = (req: Request): IUser => {
  const { token } = req;
  const identity = TokenManager.verify(token);
  return identity as IUser;
};

class Controller {
  public basePath: string;
  public router: Router = Router();
  protected wrapper = asyncWrapper;
  protected getUserIdentity = getUserIdentity;

  get config(): IConfig {
    return (async () => {
      const config: IConfig = {};
      const configs = await ConfigModel.find({});
      configs.forEach((v) => {
        config[v.key] = v.value;
      });
      return config;
    })();
  }
}

export default Controller;
