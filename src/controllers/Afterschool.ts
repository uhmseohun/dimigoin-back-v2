import { Controller } from '../interfaces';
import { Request, Response, NextFunction } from 'express';
import { CheckUserType } from '../middlewares';
import { AccessDeniedException } from '../exceptions/Permission';
import { AfterschoolModel } from '../models';

class AfterschoolController extends Controller {
  public basePath = '/afterschool';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['T']),
      this.wrapper(this.getAllAfterschools));
    this.router.get('/grade/:grade', CheckUserType(['S', 'T']),
      this.wrapper(this.getAfterschoolsByGrade));
  }

  private getAllAfterschools = async (req: Request, res: Response, next: NextFunction) => {
    const afterschools = await AfterschoolModel.find();
    res.json({ afterschools });
  }

  private getAfterschoolsByGrade = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req);
    const grade = Number(req.params.grade);
    if (user.userType === 'S' && user.grade !== grade) {
      throw new AccessDeniedException();
    }
    const afterschools = await AfterschoolModel.find({ grade });
    res.json({ afterschools });
  }
}

export default AfterschoolController;
