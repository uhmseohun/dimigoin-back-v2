import { NextFunction, Request, Response } from 'express'
import { Controller } from '../classes'
import { CircleModel, CircleApplicationModel } from '../models'
import Route from '../resources/RouteGenerator'

class CircleController extends Controller {
  public basePath = '/circle';

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.get('/', Route(['S', 'T'], this.requiredKeys.none, this.getAllCircles))
    this.router.get('/id/:circleId', Route(['S', 'T'], this.requiredKeys.none, this.getOneCircle))
  }

  private getAllCircles = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req)
    const applications = await CircleApplicationModel.findByApplier(user._id)
    const appliedIds = await Promise.all(
      applications.map(application => application.circle.toString())
    )
    const circleModels = await CircleModel.find()
      .populate('chair', ['name', 'serial'])
      .populate('viceChair', ['name', 'serial'])
    const circles = await Promise.all(circleModels.map(circle => {
      if (appliedIds.includes(circle._id.toString())) {
        circle.applied = true
      }
      return circle
    }))
    res.json({ circles })
  }

  private getOneCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circleId = req.params.circleId
    const user = this.getUserIdentity(req)
    const circle = await CircleModel.findById(circleId)
      .populate('chair', ['name', 'serial'])
      .populate('viceChair', ['name', 'serial'])
    const applicationstatus = await CircleApplicationModel.findOne({ circle: circleId, applier: user._id })
    if (applicationstatus == null) {
      circle.applied = false
    }
    if (applicationstatus != null) {
      circle.applied = true
    }
    res.json({ circle })
  }
}

export default CircleController
