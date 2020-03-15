import { NextFunction, Request, Response } from 'express';
import { Controller } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleModel } from '../models';

class CircleController extends Controller {
  public basePath = '/circle';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['S', 'T']), this.wrapper(this.getAllCircles));
  }

  private getAllCircles = async (req: Request, res: Response, next: NextFunction) => {
    const circles = await CircleModel.find().populate('chair');
    res.json({ circles });
  }
}

export default CircleController;
