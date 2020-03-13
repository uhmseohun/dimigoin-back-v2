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
      await CircleModel.find({}) as ICircle[];
    const students: IUser[] =
      await UserModel.find({}) as IUser[];

    circles = circles.map((circle) => {
      const chair: IUser = students.find((v) => v.idx === circle.chair);
      return {
        _id: circle._id,
        name: circle.name,
        category: circle.category,
        description: circle.description,
        chair: {
          name: chair.name,
          serial: chair.serial,
        },
      };
    });
    res.json({ circles });
  }
}

export default CircleController;
