import { NextFunction, Request, Response } from 'express';
import { AuthFailException } from '../exceptions/DimiAPI';
import { Controller, IUser } from '../interfaces';
import { IAccount } from '../interfaces/DimiAPI';
import { UserModel } from '../models';
import DimiAPI from '../resources/DimiAPI';
import Token from '../resources/Token';

class AuthController extends Controller {
  public basePath = '/auth';

  private DimiAPIClient = new DimiAPI();
  private TokenManager = new Token();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.validator(this.requiredKeys.identifyUser),
      this.wrapper(this.identifyUser));
  }

  private identifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const account: IAccount = req.body;

    try {
      const { id } = await this.DimiAPIClient.getIdentity(account);
      const identity: IUser = await UserModel.findOne({ idx: id });

      res.json({
        accessToken: this.TokenManager.issue(identity, false),
        refreshToken: this.TokenManager.issue(identity, true),
      });
    } catch (error) {
      throw new AuthFailException();
    }
  }
}

export default AuthController;
