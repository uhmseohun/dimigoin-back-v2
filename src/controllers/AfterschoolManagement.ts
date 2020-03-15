import { Controller } from '../interfaces';
import { Request, Response, NextFunction } from 'express';
import { CheckUserType } from '../middlewares';
import { AfterschoolModel, UserModel } from '../models';
import { IAfterschool } from '../interfaces';
import { TeacherNotFoundException } from '../exceptions/User';

class AfterschoolManagementController extends Controller {
  public basePath = '/afterschool';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', CheckUserType(['T']),
      this.validator(this.requiredKeys.createAfterschool),
      this.wrapper(this.createAfterschool));
  }

  private createAfterschool = async (req: Request, res: Response, next: NextFunction) => {
    const afterschool: IAfterschool = req.body;
    const teacher = await UserModel.findById(afterschool.teacher);
    if (teacher.userType !== 'T') {
      throw new TeacherNotFoundException();
    }
    await AfterschoolModel.create(afterschool);
    res.json({ afterschool });
  }
}

export default AfterschoolManagementController;
