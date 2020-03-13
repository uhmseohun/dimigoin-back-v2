import { NextFunction, Request, Response } from 'express';
import { AccessDeniedException } from '../exceptions/Permission';
import { Controller, ICircle, ICircleApplicationQuestion, IUser } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleApplicationQuestionModel, CircleModel } from '../models';

class CircleApplierSelection extends Controller {
  public basePath = '/circle/selection';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['S']), this.wrapper(this.getApplicationForm));
  }

  private getApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = this.getUserIdentity(req);
    const circle: ICircle[] = await CircleModel.find({}).populate('user');
    if (!circle.map((v) => v.chair).includes(user.serial)) { throw new AccessDeniedException(); }
    const form: ICircleApplicationQuestion[] =
      await CircleApplicationQuestionModel.find({
        chair: user._id,
      });
    res.json({ form });
  }
}

export default CircleApplierSelection;
