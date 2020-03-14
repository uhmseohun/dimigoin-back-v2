import { NextFunction, Request, Response } from 'express';
import { Controller, IConfig } from '../interfaces';
import { ConfigModel } from '../models';

class ConfigController extends Controller {
  public basePath = '/config';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.wrapper(this.getAllConfig));
    this.router.put('/', this.wrapper(this.editConfig));
  }

  private getAllConfig = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ config: await this.config });
  }

  private editConfig = async (req: Request, res: Response, next: NextFunction) => {
    const newConfig: IConfig = req.body;
    const config = await ConfigModel.findOne({ key: newConfig.key });
    if (config) {
      config.value = newConfig.value;
      await config.save();
    } else {
      await ConfigModel.create(newConfig);
    }
    res.json({
      key: config.key,
      value: config.value,
    });
  }
}

export default ConfigController;
