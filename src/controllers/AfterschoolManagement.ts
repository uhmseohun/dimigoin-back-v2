import { NextFunction, Request, Response } from 'express'
import { TeacherNotFoundException } from '../exceptions/User'
import { IAfterschool } from '../interfaces'
import { Controller } from '../classes'
import Route from '../resources/RouteGenerator'
import { AfterschoolModel, UserModel } from '../models'

class AfterschoolManagementController extends Controller {
  public basePath = '/afterschool';

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.post('/',
      Route(['T'], this.requiredKeys.createAfterschool, this.createAfterschool))
  }

  private createAfterschool = async (req: Request, res: Response, next: NextFunction) => {
    const afterschool: IAfterschool = req.body
    const teacher = await UserModel.findById(afterschool.teacher)
    if (teacher.userType !== 'T') {
      throw new TeacherNotFoundException()
    }
    await AfterschoolModel.create(afterschool)
    res.json({ afterschool })
  }
}

export default AfterschoolManagementController
