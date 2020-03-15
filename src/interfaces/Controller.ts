import { NextFunction, Request, Response, Router } from 'express'
import { BodyValidationFailException } from '../exceptions/Validation'
import { IConfig } from '../interfaces'
import { ConfigModel } from '../models'
import Token from '../resources/Token'
import IUser from './User'

const TokenManager = new Token()

const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next)

const getUserIdentity = (req: Request) => {
  const { token } = req
  const identity = TokenManager.verify(token)
  return identity as IUser
}

const validator = (requiredKeys: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const invalidKeys = requiredKeys.split(', ').filter((key) => {
      return !Object.hasOwnProperty.call(req.body, key)
    })
    if (invalidKeys.length > 0) {
      throw new BodyValidationFailException(invalidKeys)
    } else { next() }
  }
}

enum requiredKeys_ {
  identifyUser = 'username, password',
  createApplication = 'circle, form',
  updateApplicationForm = 'form',
  setApplierStatus = 'status',
  createCircle = 'name, category, description, chair',
  editConfig = 'key, value',
  createAfterschool = 'name, description, grade, ' +
    'class, teacher, capacity',
}

class Controller {
  public basePath: string;
  public router: Router = Router();
  protected wrapper = asyncWrapper;
  protected getUserIdentity = getUserIdentity;
  protected validator = validator;
  protected requiredKeys = requiredKeys_;

  get config () {
    return (async () => {
      const config: IConfig = {}
      const configs = await ConfigModel.find()
      configs.forEach((v) => {
        config[v.key] = v.value
      })
      return config
    })()
  }
}

export default Controller
