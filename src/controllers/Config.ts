import { NextFunction, Request, Response } from 'express';
import { Controller, IConfig } from '../interfaces';
import { ConfigModel } from '../models';
import { ConfigNotFoundException } from '../exceptions/Config';

class ConfigController extends Controller {
  public basePath = '/config';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.wrapper(this.getAllConfig));
    this.router.post('/', this.wrapper(this.createConfig));
    this.router.put('/:configId', this.wrapper(this.editConfig));
  }

  private getAllConfig = async (req: Request, res: Response, next: NextFunction) => {
    const config = await ConfigModel.find({});
    res.json({ config });
  }

  private createConfig = async (req: Request, res: Response, next: NextFunction) => {
    const config: IConfig = req.body;
    await ConfigModel.create(config);
    res.status(204).end();
  }

  private editConfig = async (req: Request, res: Response, next: NextFunction) => {
    const configId = req.params.configId,
          newValue = req.body.value;
    const config = await ConfigModel.findById(configId);
    if (!config) { throw new ConfigNotFoundException(); }
    config.value = newValue;
    await config.save();
    res.status(204).end();
  }
}

export default ConfigController;
