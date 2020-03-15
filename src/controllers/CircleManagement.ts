import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import { CircleNotFoundException, ImageNotAttachedException } from '../exceptions/Circle';
import { StudentNotFoundException } from '../exceptions/Student';
import { NotAllowedExtensionException, S3UploadFailException } from '../exceptions/Upload';
import { Controller, ICircle, IUser } from '../interfaces';
import { ConfigKeys } from '../Types';
import { CheckUserType } from '../middlewares';
import { CircleModel, UserModel } from '../models';
import Upload from '../resources/Upload';

class CircleManagementController extends Controller {
  public basePath = '/circle';
  private UploadClient = new Upload();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', CheckUserType(['T']),
      this.validator(this.requiredKeys.createCircle),
      this.wrapper(this.createCircle));
    this.router.delete('/:circleId', CheckUserType(['T']), this.wrapper(this.removeCircle));
    this.router.put('/:circleId/image', this.wrapper(this.putCircleImage));
  }

  private createCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circle = req.body;

    const chair: IUser = await UserModel.findOne({ serial: circle.chair });
    if (!chair) { throw new StudentNotFoundException(); }

    const newCircle = await CircleModel.create({
      name: circle.name,
      category: circle.category,
      description: circle.description,
      chair: chair._id,
    });

    res.json({ circle: newCircle });
  }

  private removeCircle = async (req: Request, res: Response, next: NextFunction) => {
    const circle = await CircleModel.findById(req.params.circleId);
    if (!circle) { throw new CircleNotFoundException(); }
    await circle.remove();
    res.json({ circle });
  }

  private putCircleImage = async (req: Request, res: Response, next: NextFunction) => {
    const { circleId } = req.params;
    const circle = await CircleModel.findById(circleId);
    if (!circle) { throw new CircleNotFoundException(); }

    try { // 더 깔끔하게 짤 수 있을까?
      const _ = req.files.image;
    } catch (error) {
      throw new ImageNotAttachedException();
    }

    const { image }: any = req.files;
    const ext = this.UploadClient.fileExtension(image.name);
    if (!(await this.config)[ConfigKeys.imageExtension].includes(ext)) {
      throw new NotAllowedExtensionException();
    }
    const key = `CIRCLE_PROFILE/${circle.name}${ext}`;
    try {
      await this.UploadClient.upload(key, image.data);
    } catch (error) {
      throw new S3UploadFailException();
    }
    circle.imageKey = key;
    await circle.save();
    res.json({ key });
  }
}

export default CircleManagementController;
