import { NextFunction, Request, Response, Router } from 'express';
import { Document } from 'mongoose';
import { CircleNotFoundException } from '../exceptions/Circle';
import { StudentNotFoundException } from '../exceptions/Student';
import { Controller, ICircle, IStudent } from '../interfaces';
import { CircleModel, StudentModel } from '../models';

class CircleController extends Controller {
  public basePath = '/circle';
  public router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.wrapper(this.getAllCircles));
    this.router.post('/', this.wrapper(this.createCircle));
    this.router.delete('/:circleId', this.wrapper(this.removeCircle));
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

  private createCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circle: ICircle = req.body;

    const chair = await StudentModel.findOne({ serial: circle.chair });
    if (!chair) { throw new StudentNotFoundException(); }

    const newCircle = await CircleModel.create({
      name: circle.name,
      description: circle.description,
      chair: chair.idx,
    });

    res.json({ circle: newCircle });
  }

  private removeCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circle: ICircle & Document = await CircleModel.findById(req.params.circleId);
    if (!circle) { throw new CircleNotFoundException(); }
    await circle.remove();
    res.status(204).end();
  }
}

export default CircleController;
