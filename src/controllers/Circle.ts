import { NextFunction, Request, Response } from 'express';
import { Controller, ICircle, IStudent } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleModel, StudentModel } from '../models';

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
    const students: IStudent[] =
      await StudentModel.find({}) as IStudent[];

    circles = circles.map((circle) => {
      const chair: IStudent = students.find((v) => v.idx === circle.chair);
      return {
        _id: circle._id,
        name: circle.name,
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
