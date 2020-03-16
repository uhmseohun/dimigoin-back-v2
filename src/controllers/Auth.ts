import { NextFunction, Request, Response } from 'express'
import { AuthFailException } from '../exceptions/DimiAPI'
import { Controller } from '../classes'
import { IAccount } from '../interfaces/DimiAPI'
import { UserModel } from '../models'
import DimiAPI from '../resources/DimiAPI'
import Token from '../resources/Token'
import Route from '../resources/RouteGenerator'

class AuthController extends Controller {
  public basePath = '/auth';

  private DimiAPIClient = new DimiAPI();
  private TokenManager = new Token();

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.post('/', Route('U', this.requiredKeys.identifyUser, this.identifyUser))
  }

  private identifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const account: IAccount = req.body

    try {
      const { id: idx } = await this.DimiAPIClient.getIdentity(account)
      const identity = await UserModel.findByIdx(idx)

      res.json({
        accessToken: this.TokenManager.issue(identity, false),
        refreshToken: this.TokenManager.issue(identity, true)
      })
    } catch (error) {
      throw new AuthFailException()
    }
  }
}

export default AuthController
