import { NextFunction, Request, Response } from 'express';
import {
  Controller,
  ICircleApplicationQuestion,
} from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleApplicationQuestionModel } from '../models';

class CircleApplicationManagementController extends Controller {
  public basePath = '/circle/application/form';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['T']), this.wrapper(this.getApplicationForm));
    this.router.post('/', CheckUserType(['T']), this.wrapper(this.updateApplicationForm));
  }

  private getApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const form: ICircleApplicationQuestion[] =
      await CircleApplicationQuestionModel.find();
    res.json({ form });
  }

  private updateApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const form: ICircleApplicationQuestion[] = req.body.form;
    await CircleApplicationQuestionModel.deleteMany({});
    await CircleApplicationQuestionModel.create(form);
    res.status(204).end();
  }
}

export default CircleApplicationManagementController;
