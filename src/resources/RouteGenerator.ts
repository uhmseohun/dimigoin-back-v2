import { UserType, Middleware } from '../types'
import { Request, Response, NextFunction } from 'express'
import { CheckUserType, Validator } from '../middlewares'

const asyncWrapper = (fn: Middleware) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next)

// UserType 'U' => UnAuthorized
// UserType 'A' => All Users ('S', 'O', 'D', 'T', 'P')
export default (allowedUserType: (UserType[] | 'U' | 'A'),
  requiredKeys: string,
  action: Middleware) => {
  return [
    CheckUserType(allowedUserType),
    Validator(requiredKeys),
    asyncWrapper(action)
  ]
}
