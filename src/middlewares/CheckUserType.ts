import { NextFunction, Request, Response } from 'express'
import { AccessDeniedException } from '../exceptions/Permission'
import Token from '../resources/Token'
import { UserType } from '../types'

const TokenManager = new Token()

const checkUserType = (userType: UserType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.token) throw new AccessDeniedException()
    const { token } = req
    const identity = TokenManager.verify(token)
    if (userType.includes(identity.userType)) next()
    else throw new AccessDeniedException()
  }
}

export default checkUserType
