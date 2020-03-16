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
  }

  private getAllCircles = async (req: Request, res: Response, next: NextFunction) => {
    const circles = await CircleModel.find().populate('chair')
    res.json({ circles })
  }
}

export default CircleController
