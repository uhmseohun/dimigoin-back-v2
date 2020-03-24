import { NextFunction, Request, Response } from 'express'
import { Controller } from '../classes'
import { CircleModel } from '../models'
import Route from '../resources/RouteGenerator'
import mongoose from 'mongoose'

class CircleController extends Controller {
  public basePath = '/circle';

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.get('/', Route(['S', 'T'], this.requiredKeys.none, this.getAllCircles))
    this.router.get('/:circleId', Route(['S', 'T'], this.requiredKeys.none, this.getOneCircles))
  }

  private getAllCircles = async (req: Request, res: Response, next: NextFunction) => {
    const circles = await CircleModel.find()
      .populate('chair', ['name', 'serial'])
      .populate('viceChair', ['name', 'serial'])
    res.json({ circles })
  }

  private getOneCircles = async (req: Request, res: Response, next: NextFunction) => {
    const circleId = mongoose.Types.ObjectId(req.params.circleId)
    const circles = await CircleModel.find({ _id: circleId })
    res.json({ circles })
  }
}

export default CircleController
