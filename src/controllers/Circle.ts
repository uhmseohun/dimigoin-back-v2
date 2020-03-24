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
      applications.map(application => application._id)
    )
    const circles = await CircleModel.find()
      .populate('chair', ['name', 'serial'])
      .populate('viceChair', ['name', 'serial'])
    await Promise.all(circles.map(circle => {
      if (appliedIds.includes(circle._id)) {
        circle.applied = true
      }
      return circle
    }))
    res.json({ circles })
  }

  private getOneCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circleId = req.params.circleId
    const circle = await CircleModel.findById(circleId)
      .populate('chair', ['name', 'serial'])
      .populate('viceChair', ['name', 'serial'])
    res.json({ circle })
  }
}

export default CircleController
