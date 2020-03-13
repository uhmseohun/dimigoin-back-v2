import { NextFunction, Request, Response } from 'express';
import {
  Controller,
  ICircleApplicationQuestion,
  ICircleApplicationForm,
} from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleApplicationQuestionModel, CircleApplicationFormModel } from '../models';

class CircleApplicationManagementController extends Controller {
  public basePath = '/circle';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/application/form', CheckUserType(['T']), this.wrapper(this.getApplicationForm));
    this.router.post('/application/form', CheckUserType(['T']), this.wrapper(this.updateApplicationForm));
    this.router.get('/applier', CheckUserType(['T']), this.wrapper(this.getAllSubmittedForm));
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

  private getAllSubmittedForm = async (req: Request, res: Response, next: NextFunction) => {
    const forms: ICircleApplicationForm[] =
      await CircleApplicationFormModel.find({}).populate(['circle', 'applier']);
    res.json({ form: forms });
  }
}

export default CircleApplicationManagementController;
