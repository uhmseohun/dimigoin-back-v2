import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import {
  CircleApplicationDeadlineException,
  CircleApplicationLimitException,
  CircleApplicationNotFoundException,
  CircleApplicationQuestionException,
  ConflictedCircleApplicationException,
  NotPassedCircleSelectionException,
} from '../exceptions/CircleApplication';
import { AlreadySelectedApplierException } from '../exceptions/CircleApplierSelection';
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
    this.router.post('/final/:circleId', CheckUserType(['S']), this.wrapper(this.finalSelection));
  }

  private getApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = this.getUserIdentity(req) as IUser;
    const appliedForm: ICircleApplicationForm[] =
      await CircleApplicationFormModel.find({ applier: user._id });
    const appliedCircle: ICircle[] = await CircleModel.find({
      _id: { $in: appliedForm.map((v) => v.circle) },
    });
    const form: ICircleApplicationQuestion[] = await CircleApplicationQuestionModel.find({});
    res.json({
      maxApplyCount: (await this.config)[ConfigKeys.circleMaxApply],
      appliedForm,
      appliedCircle,
      form,
    });
  }

  private createApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const config = await this.config;
    if (!config[ConfigKeys.circleAppliable]) { throw new CircleApplicationDeadlineException(); }
    const user: IUser = this.getUserIdentity(req) as IUser;
    const applied: ICircleApplicationForm[] =
      await CircleApplicationFormModel.find({ applier: user._id });
    const form: ICircleApplicationForm = req.body;
    form.applier = user._id;

    if (applied.find((v) => v.status === 'final')) {
      throw new AlreadySelectedApplierException();
    }

    if (applied.length >= config[ConfigKeys.circleMaxApply]) {
      throw new CircleApplicationLimitException();
    }

    if (applied.map((v) => v.circle.toString()).includes(form.circle.toString())) {
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
    res.json({ application: form });
  }

  private finalSelection = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = this.getUserIdentity(req) as IUser;
    const applied: Array<ICircleApplicationForm & Document> =
      await CircleApplicationFormModel.find({ applier: user._id });

    if (applied.filter((v) => v.status === 'final').length > 0) {
      throw new AlreadySelectedApplierException();
    }

    const final: (ICircleApplicationForm & Document) =
      applied.find((v) => v.circle.toString() === req.params.circleId);

    if (!final) {
      throw new CircleApplicationNotFoundException();
    }

    if (final.status !== 'pass') {
      throw new NotPassedCircleSelectionException();
    }

    final.status = 'final';
    await final.save();
    res.json({ application: final });
  }
}

export default CircleApplicationController;
