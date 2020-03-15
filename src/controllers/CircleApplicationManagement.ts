import { NextFunction, Request, Response } from 'express';
import {
  Controller,
  ICircleApplicationQuestion,
} from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleApplicationModel, CircleApplicationQuestionModel } from '../models';

class CircleApplicationManagementController extends Controller {
  public basePath = '/circle';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/application/form', CheckUserType(['S', 'T']), this.wrapper(this.getApplicationForm));
    this.router.post('/application/form', CheckUserType(['T']),
      this.validator(this.requiredKeys.updateApplicationForm),
      this.wrapper(this.updateApplicationForm));
    this.router.get('/applier', CheckUserType(['T']), this.wrapper(this.getAllApplications));
  }

  private getApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const form = await CircleApplicationQuestionModel.find();
    res.json({ form });
  }

  private updateApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const form: ICircleApplicationQuestion[] = req.body.form;
    await CircleApplicationQuestionModel.deleteMany({});
    await CircleApplicationQuestionModel.create(form);
    res.json({ form });
  }

  private getAllApplications = async (req: Request, res: Response, next: NextFunction) => {
    const applications = await CircleApplicationModel.find({}).populate(['circle', 'applier']);
    res.json({ applications });
  }
}

export default CircleApplicationManagementController;
