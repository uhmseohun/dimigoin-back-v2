import { NextFunction, Request, Response, Router } from 'express';
import { ConfigModel } from '../models';
import Token from '../resources/Token';

const TokenManager = new Token();

const asyncWrapper = (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

const getUserIdentity = (req: Request) => {
  const { token } = req;
  const identity = TokenManager.verify(token);
  return identity;
};

class Controller {
  public basePath: string;
  public router: Router = Router();
  protected wrapper = asyncWrapper;
  protected getUserIdentity = getUserIdentity;

  get config() {
    return (async () => {
      const config: any = {};
      const configs = await ConfigModel.find({});
      configs.forEach((v) => {
        config[v.key] = v.value;
      });
      return config;
    })();
  }
}

export default Controller;
