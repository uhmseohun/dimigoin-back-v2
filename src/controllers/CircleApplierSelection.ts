import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import { CircleApplicationNotFoundException } from '../exceptions/CircleApplication';
import {
  AlreadyFailedApplierException,
  AlreadyInterviewerException,
  AlreadyPassedApplierException,
  AlreadySelectedApplierException,
  NeedGraduallyStatusSet,
} from '../exceptions/CircleApplierSelection';
import { AccessDeniedException } from '../exceptions/Permission';
import { StudentNotFoundException } from '../exceptions/Student';
import { Controller, ICircleApplicationForm, IUser } from '../interfaces';
import { CircleApplicationStatus } from '../interfaces/Types';
import { CheckUserType } from '../middlewares';
import { CircleApplicationFormModel, CircleModel } from '../models';
import { UserModel } from '../models';

class CircleApplierSelection extends Controller {
  public basePath = '/circle/selection';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['S']), this.wrapper(this.getApplicationForm));
    this.router.put('/:applierId', CheckUserType(['S']), this.wrapper(this.setApplierStatus));
  }

  private getApplicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = this.getUserIdentity(req);
    const circle = await CircleModel.findOne({ chair: user._id });
    if (!circle) { throw new AccessDeniedException(); }

    const form =
      await CircleApplicationFormModel
        .find({ circle: circle._id })
        .populate(['applier', 'circle']);

    res.json({ applications: form });
  }

  private setApplierStatus = async (req: Request, res: Response, next: NextFunction) => {
    const applier: IUser = await UserModel.findById(req.params.applierId);
    if (!applier) { throw new StudentNotFoundException(); }

    const application: ICircleApplicationForm & Document =
      await CircleApplicationFormModel.findOne({ applier: applier._id });
    if (!application) { throw new CircleApplicationNotFoundException(); }

    const status: CircleApplicationStatus = req.body.status;

    if (application.status === 'applied') {
      if (['interview', 'fail'].includes(status)) {
        application.status = status;
      } else {
        throw new NeedGraduallyStatusSet();
      }
    } else if (application.status === 'interview') {
      if (['pass', 'fail'].includes(status)) {
        application.status = status;
      } else {
        throw new AlreadyInterviewerException();
      }
    } else if (application.status === 'pass') {
      throw new AlreadyPassedApplierException();
    } else if (application.status === 'final') {
      throw new AlreadySelectedApplierException();
    } else if (application.status === 'fail') {
      throw new AlreadyFailedApplierException();
    }
    await application.save();
    res.status(204).end();
  }
}

export default CircleApplierSelection;
