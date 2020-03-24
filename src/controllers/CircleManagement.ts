import { NextFunction, Request, Response } from 'express'
import { CircleNotFoundException, ImageNotAttachedException } from '../exceptions/Circle'
import { StudentNotFoundException } from '../exceptions/Student'
import { NotAllowedExtensionException, S3UploadFailException } from '../exceptions/Upload'
import { Controller } from '../classes'
import { CircleModel, UserModel } from '../models'
import Upload from '../resources/Upload'
import { ConfigKeys } from '../types'
import Route from '../resources/RouteGenerator'

class CircleManagementController extends Controller {
  public basePath = '/circle';
  private UploadClient = new Upload();

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.post('/',
      Route(['T', 'S'], this.requiredKeys.createCircle, this.createCircle))
    this.router.delete('/:circleId',
      Route(['T'], this.requiredKeys.none, this.removeCircle))
    this.router.put('/:circleId/image',
      Route(['T'], this.requiredKeys.none, this.putCircleImage))
  }

  private createCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circle = req.body

    const chair = await UserModel.findStudentById(circle.chair)
    if (!chair) throw new StudentNotFoundException()

    const newCircle = await CircleModel.create(circle)

    res.json({ circle: newCircle })
  }

  private removeCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circle = await CircleModel.findById(req.params.circleId)
    if (!circle) throw new CircleNotFoundException()
    await circle.remove()
    res.json({ circle })
  }

  private putCircleImage = async (req: Request, res: Response, next: NextFunction) => {
    const { circleId } = req.params
    const circle = await CircleModel.findById(circleId)
    if (!circle) throw new CircleNotFoundException()

    if (!Object.hasOwnProperty.call(req, 'files')) throw new ImageNotAttachedException()

    const { image }: any = req.files
    const ext = this.UploadClient.fileExtension(image.name)
    if (!(await this.config)[ConfigKeys.imageExtension].includes(ext)) {
      throw new NotAllowedExtensionException()
    }
    const key = `CIRCLE_PROFILE/${circle.name}${ext}`
    try {
      await this.UploadClient.upload(key, image.data)
    } catch (error) {
      throw new S3UploadFailException()
    }
    circle.imageKey = key
    await circle.save()
    res.json({ key })
  }
}

export default CircleManagementController
