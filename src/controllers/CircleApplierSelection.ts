import { NextFunction, Request, Response } from 'express';
import { AccessDeniedException } from '../exceptions/Permission';
import { Controller, IUser, ICircleApplicationForm } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleApplicationFormModel, CircleModel } from '../models';
import { UserModel } from '../models';
import { StudentNotFoundException } from '../exceptions/Student';
import { CircleApplicationNotFoundException } from '../exceptions/CircleApplication';
import { CircleApplicationStatus } from '../interfaces/Types'
import {
  AlreadySelectedApplierException,
  AlreadyFailedApplierException,
  AlreadyPassedApplierException,
  AlreadyInterviewerException,
  NeedGraduallyStatusSet,
} from '../exceptions/CircleSelection';
import { Document } from 'mongoose';

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

    res.json({ form });
  }

  private setApplierStatus = async (req: Request, res: Response, next: NextFunction) => {
    const applier: IUser = await UserModel.findById(req.params.applierId);
    if (!applier) { throw new StudentNotFoundException(); }

    const application: ICircleApplicationForm & Document =
      await CircleApplicationFormModel.findOne({ applier: applier._id });
    if (!application) { throw new CircleApplicationNotFoundException(); }

    const status: CircleApplicationStatus = req.body.status

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
