import { NextFunction, Request, Response } from 'express';
import { AccessDeniedException } from '../exceptions/Permission';
import { Controller, ICircle, ICircleApplicationQuestion, IUser } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleApplicationFormModel, CircleApplicationQuestionModel, CircleModel } from '../models';

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
    const circle = await CircleModel.findOne({ chair: user._id });
    if (!circle) { throw new AccessDeniedException(); }

    const form =
      await CircleApplicationFormModel
        .find({ circle: circle._id })
        .populate(['applier', 'circle']);

    res.json({ form });
  }
}

export default CircleApplierSelection;
