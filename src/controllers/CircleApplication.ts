import { NextFunction, Request, Response } from 'express';
import {
  CircleApplicationDeadlineException,
  CircleApplicationLimitException,
  CircleApplicationQuestionException,
  ConflictedCircleApplicationException,
} from '../exceptions/Circle';
import {
  Controller,
  ICircle,
  ICircleApplicationForm,
  ICircleApplicationQuestion,
  IUser,
} from '../interfaces';
import { ConfigKeys } from '../interfaces/Types';
import { CheckUserType } from '../middlewares';
import {
  CircleApplicationFormModel,
  CircleApplicationQuestionModel,
  CircleModel,
} from '../models';

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
    const user: IUser = this.getUserIdentity(req) as IUser;
    const appliedForm: ICircleApplicationForm[] =
      await CircleApplicationFormModel.find({ applier: user.serial });
    const circles: ICircle[] = await CircleModel.find({});
    const appliedCircle: ICircle[] = circles.filter((circle) =>
      appliedForm.map((v) => v.circle.toString()).includes(circle._id.toString()));
    const form: ICircleApplicationQuestion[] = await CircleApplicationQuestionModel.find({});
    res.json({
      maxApplyCount: (await this.config)[ConfigKeys.circleMaxApply],
      appliedForm,
      appliedCircle,
      form,
    });
  }

  private createApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const config = (await this.config);
    if (!config[ConfigKeys.circleAppliable]) { throw new CircleApplicationDeadlineException(); }
    const user: IUser = this.getUserIdentity(req) as IUser;
    const applied: ICircleApplicationForm[] = await CircleApplicationFormModel.find({ applier: user.serial });
    const form: ICircleApplicationForm = req.body;
    form.applier = user.serial;

    if (applied.length > await this.config[ConfigKeys.circleMaxApply]) {
      throw new CircleApplicationLimitException();
    }

    if (applied.map(v => v.circle.toString()).includes(form.circle.toString())) {
      throw new ConflictedCircleApplicationException();
    }

    const questions: string[] = Object.keys(form.form).sort();
    const expectedQuestions =
      (await CircleApplicationQuestionModel.find({}))
        .map((v) => v._id.toString())
        .sort();
    if (JSON.stringify(questions) !== JSON.stringify(expectedQuestions)) {
      throw new CircleApplicationQuestionException();
    }

    await CircleApplicationFormModel.create(form);
    res.status(204).end();
  }
}

export default CircleApplicationController;
