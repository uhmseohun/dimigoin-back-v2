import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = error;
  res.status(status).json({ message });
};

export default errorHandler;
