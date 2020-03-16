import { NextFunction, Request, Response } from 'express'
import { CircleApplicationNotFoundException } from '../exceptions/CircleApplication'
import {
  AlreadyFailedApplierException,
  AlreadyInterviewerException,
  AlreadyPassedApplierException,
  AlreadySelectedApplierException,
  NeedGraduallyStatusSet
} from '../exceptions/CircleApplierSelection'
import { AccessDeniedException } from '../exceptions/Permission'
import { StudentNotFoundException } from '../exceptions/Student'
import { Controller } from '../classes'
import { CircleApplicationModel, CircleModel, UserModel } from '../models'
import Route from '../resources/RouteGenerator'
import { CircleApplicationStatus } from '../types'

class CircleApplierSelection extends Controller {
  public basePath = '/circle/selection/applier';

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.get('/', Route(['S'], this.requiredKeys.none, this.getApplications))
    this.router.patch('/:applierId',
      Route(['S'], this.requiredKeys.setApplierStatus, this.setApplierStatus))
  }

  private getApplications = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req)
    const circle = await CircleModel.findByChair(user._id)
    if (!circle) throw new AccessDeniedException()

    const applications =
      await CircleApplicationModel
        .findPopulatedByCircle(circle._id)

    res.json({ applications })
  }

  private setApplierStatus = async (req: Request, res: Response, next: NextFunction) => {
    const applier = await UserModel.findById(req.params.applierId)
    if (!applier) throw new StudentNotFoundException()

    const user = this.getUserIdentity(req)
    const circle = await CircleModel.findByChair(user._id)

    const application =
      await CircleApplicationModel.findByCircleApplier(circle._id, applier._id)
    if (!application) throw new CircleApplicationNotFoundException()

    const status: CircleApplicationStatus = req.body.status

    if (application.status === 'applied') {
      if (['interview', 'fail'].includes(status)) {
        application.status = status
      } else {
        throw new NeedGraduallyStatusSet()
      }
    } else if (application.status === 'interview') {
      if (['pass', 'fail'].includes(status)) {
        application.status = status
      } else {
        throw new AlreadyInterviewerException()
      }
    } else if (application.status === 'pass') {
      throw new AlreadyPassedApplierException()
    } else if (application.status === 'final') {
      throw new AlreadySelectedApplierException()
    } else if (application.status === 'fail') {
      throw new AlreadyFailedApplierException()
    }
    await application.save()
    res.json({ application })
  }
}

export default CircleApplierSelection
