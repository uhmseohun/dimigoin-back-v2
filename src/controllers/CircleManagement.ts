import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import { CircleNotFoundException } from '../exceptions/Circle';
import { StudentNotFoundException } from '../exceptions/Student';
import { Controller, ICircle } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { CircleModel, UserModel } from '../models';

class CircleManagementController extends Controller {
  public basePath = '/circle';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', CheckUserType(['T']), this.wrapper(this.createCircle));
    this.router.delete('/:circleId', CheckUserType(['T']), this.wrapper(this.removeCircle));
  }

  private createCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circle: ICircle = req.body;

    const chair = await UserModel.findOne({ serial: circle.chair });
    if (!chair) { throw new StudentNotFoundException(); }

    const newCircle = await CircleModel.create({
      name: circle.name,
      category: circle.category,
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

export default CircleManagementController;
