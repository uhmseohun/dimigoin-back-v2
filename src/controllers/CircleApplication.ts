import { NextFunction, Request, Response, Router } from 'express';
import {
  CircleApplicationLimitException,
  CircleApplicationQuestionException,
} from '../exceptions/Circle';
import { Controller, ICircleApplicationForm, IUser } from '../interfaces';
import { CircleApplicationFormModel, CircleApplicationQuestionModel, CircleModel } from '../models';

class CircleApplicationController extends Controller {
  public basePath = '/circle/application';
  public router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.wrapper(this.getApplicationStatus));
    this.router.post('/', this.wrapper(this.createApplicationForm));
  }

  private getApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req) as IUser;
    const applied = await CircleApplicationFormModel.find({ applier: user._id });
    const circles: any[] = [];
    applied.forEach((form) => {
      const circle = CircleModel.findById(form.circle);
      circles.push(circle);
    });

    res.json({
      maxApplyCount: 3, // 나중에 Config Class로 처리할 거임
      appliedCircle: circles,
    });
  }

  private createApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req) as IUser;
    const applied = await CircleApplicationFormModel.find({ applier: user._id });
    const form: ICircleApplicationForm = req.body;
    form.applier = user._id;

    if (applied.length > 3) { throw new CircleApplicationLimitException(); }

    const questions: string[] = Object.keys(form.form).sort();
    const expectedQuestions =
      (await CircleApplicationQuestionModel.find({}))
        .map((v) => v.question)
        .sort();
    if (JSON.stringify(questions) !== JSON.stringify(expectedQuestions)) {
      throw new CircleApplicationQuestionException();
    }

    await CircleApplicationFormModel.create(form);
    res.status(204).end();
  }
}

export default CircleApplicationController;
