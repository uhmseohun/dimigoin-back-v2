import { NextFunction, Request, Response, Router } from 'express';
import HttpException from '../exceptions/HttpException';
import { Controller } from '../interfaces';
import DimiAPI from '../resources/DimiAPI';

class UserController extends Controller {
  public basePath = '/user';

  private DimiAPIClient = new DimiAPI();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/reload', this.wrapper(this.reloadUsers));
  }

  private reloadUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.DimiAPIClient.reloadAllUsers();
      await this.DimiAPIClient.reloadAllStudents();
      res.end();
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  }
}

export default UserController;
