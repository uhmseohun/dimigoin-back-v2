import { NextFunction, Request, Response } from 'express';
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
import { Controller, IUser } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleApplicationModel, CircleModel } from '../models';
import { UserModel } from '../models';
import { CircleApplicationStatus } from '../types';

class CircleApplierSelection extends Controller {
  public basePath = '/circle/selection/applier';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['S']), this.wrapper(this.getApplications));
    this.router.put('/:applierId', CheckUserType(['S']),
      this.validator(this.requiredKeys.setApplierStatus),
      this.wrapper(this.setApplierStatus));
  }

  private getApplications = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req);
    const circle = await CircleModel.findByChair(user._id);
    if (!circle) { throw new AccessDeniedException(); }

    const applications =
      await CircleApplicationModel
        .find({ circle: circle._id })
        .populate(['applier', 'circle']);

    res.json({ applications });
  }

  private setApplierStatus = async (req: Request, res: Response, next: NextFunction) => {
    const applier = await UserModel.findById(req.params.applierId);
    if (!applier) { throw new StudentNotFoundException(); }

    const user = this.getUserIdentity(req);
    const circle = await CircleModel.findByChair(user._id);

    const application =
      await CircleApplicationModel.findByCircleAndApplier(circle._id, applier._id);
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
    res.json({ application });
  }
}

export default CircleApplierSelection;
