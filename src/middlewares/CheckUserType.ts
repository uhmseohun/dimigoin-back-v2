import { NextFunction, Request, Response } from 'express';
import Token from '../resources/Token';
import { AccessDeniedException } from '../exceptions/Permission';
import { UserType } from '../interfaces/Types';
import { IUser } from '../interfaces';

const TokenManager = new Token();

const checkUserType = (userType: UserType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.token) { throw new AccessDeniedException(); }
    const { token } = req;
    const identity: IUser = TokenManager.verify(token) as IUser;
    if (userType.includes(identity.userType)) next();
    else { throw new AccessDeniedException(); }
  };
}

export default checkUserType;
