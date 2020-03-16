import { NextFunction, Request, Response } from 'express'
import { AccessDeniedException } from '../exceptions/Permission'
import { Controller } from '../classes'
import { AfterschoolModel } from '../models'
import Route from '../resources/RouteGenerator'

class AfterschoolController extends Controller {
  public basePath = '/afterschool';

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.get('/', Route(['T'], this.requiredKeys.none, this.getAllAfterschools))
    this.router.get('/grade/:grade',
      Route(['S', 'T'], this.requiredKeys.none, this.getAfterschoolsByGrade))
  }

  private getAllAfterschools = async (req: Request, res: Response, next: NextFunction) => {
    const afterschools = await AfterschoolModel.find()
    res.json({ afterschools })
  }

  private getAfterschoolsByGrade = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req)
    const grade = Number(req.params.grade)
    if (user.userType === 'S' && user.grade !== grade) {
      throw new AccessDeniedException()
    }
    const afterschools = await AfterschoolModel.find({ grade })
    res.json({ afterschools })
  }
}

export default AfterschoolController
