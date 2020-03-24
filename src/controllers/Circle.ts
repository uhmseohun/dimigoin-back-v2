import { NextFunction, Request, Response } from 'express'
import { Controller } from '../classes'
import { CircleModel } from '../models'
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
    const circles = await CircleModel.find()
      .populate('chair', ['name', 'serial'])
      .populate('viceChair', ['name', 'serial'])
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
