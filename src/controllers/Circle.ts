import { NextFunction, Request, Response } from 'express';
import { Controller, ICircle, IUser } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleModel, UserModel } from '../models';

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
    let circles: any[] =
      await CircleModel.find({}).populate('chair');
    circles = circles.map(circle => {
      circle.chair = {
        serial: circle.chair.serial,
        name: circle.chair.name,
      }
      return circle;
    });
    res.json({ circles });
  }
}

export default CircleController;
