import { NextFunction, Request, Response } from 'express';
import {
  CircleApplicationLimitException,
  CircleApplicationQuestionException,
} from '../exceptions/Circle';
import { Controller, ICircle, ICircleApplicationForm, IUser } from '../interfaces';
import { CircleApplicationFormModel, CircleApplicationQuestionModel, CircleModel } from '../models';
import { CheckUserType } from '../middlewares';

class CircleApplicationController extends Controller {
  public basePath = '/circle/application';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['S']), this.wrapper(this.getApplicationStatus));
    this.router.post('/', CheckUserType(['S']), this.wrapper(this.createApplicationForm));
  }

  private getApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req) as IUser;
    const appliedForm = await CircleApplicationFormModel.find({ applier: user._id });
    const circles: ICircle[] = await CircleModel.find({});
    const appliedCircle: ICircle[] = circles.filter(circle =>
      appliedForm.map(v => v.circle.toString()).includes(circle._id.toString()));
    const form = await CircleApplicationQuestionModel.find({});
    res.json({
      maxApplyCount: 3, // 나중에 Config Class로 처리할 거임
      appliedForm,
      appliedCircle,
      form,
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
        .map((v) => String(v._id))
        .sort();
    if (JSON.stringify(questions) !== JSON.stringify(expectedQuestions)) {
      throw new CircleApplicationQuestionException();
    }

    await CircleApplicationFormModel.create(form);
    res.status(204).end();
  }
}

export default CircleApplicationController;
