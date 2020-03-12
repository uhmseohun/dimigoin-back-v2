import { NextFunction, Request, Response, Router } from 'express';
import { AuthFailException } from '../exceptions/DimiAPI';
import HttpException from '../exceptions/HttpException';
import { Controller } from '../interfaces';
import { IAccount } from '../interfaces/DimiAPI';
import DimiAPI from '../resources/DimiAPI';
import Token from '../resources/Token';

class AuthController extends Controller {
  public basePath = '/auth';
  public router = Router();

  private DimiAPIClient = new DimiAPI();
  private TokenManager = new Token();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.wrapper(this.identifyUser));
  }

  private identifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const account: IAccount = req.body;

    try {
      let identity = await this.DimiAPIClient.getIdentity(account);
      identity = this.DimiAPIClient.restructureIdentity(identity);
      res.json({
        accessToken: this.TokenManager.issue(identity, false),
        refreshToken: this.TokenManager.issue(identity, true),
      });
    } catch (error) {
      const { response: { status } } = error;
      if (status === 404) {
        throw new AuthFailException();
      } else {
        throw new HttpException();
      }
    }
  }
}

export default AuthController;
