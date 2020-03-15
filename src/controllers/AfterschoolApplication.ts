import { Controller } from '../interfaces';
import { NextFunction, Request, Response } from 'express';
import { AfterschoolModel, AfterschoolApplicationModel } from '../models';
import { CheckUserType } from '../middlewares';

class AfterschoolApplicationController extends Controller {
  public basePath = '/afterschool/application';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['S']), this.wrapper(this.getApplicationStatus));
    this.router.post('/:afterschoolId', CheckUserType(['S']), this.wrapper(this.createApplication));
  }

  private getApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req);
    const applications = AfterschoolApplicationModel.findByApplier(user._id);
    res.json({ applications });
  }

  private createApplication = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req);
    const applications = await AfterschoolApplicationModel.findByApplier(user._id);
    const afterschool = await AfterschoolModel.findById(req.params.afterschoolId);
  }
}

export default AfterschoolApplicationController;
