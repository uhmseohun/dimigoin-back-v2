import { NextFunction, Request, Response, Router } from 'express';

const asyncWrapper = (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

class Controller {
  public basePath: string;
  public router: Router;
  protected wrapper = asyncWrapper;
}

export default Controller;
