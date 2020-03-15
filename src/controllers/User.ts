import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { Controller } from '../interfaces';
import { CheckUserType } from '../middlewares';
import { UserModel } from '../models';
import DimiAPI from '../resources/DimiAPI';

class UserController extends Controller {
  public basePath = '/user';

  private DimiAPIClient = new DimiAPI();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', CheckUserType(['T']), this.wrapper(this.getAllUsers));
    this.router.get('/student', CheckUserType(['T']), this.wrapper(this.getAllStudents));
    this.router.get('/teacher', CheckUserType(['T']), this.wrapper(this.getAllTeachers));
    this.router.get('/reload', this.wrapper(this.reloadUsers));
  }

  private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find();
    res.json({ users });
  }

  private getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    const students = await UserModel.findStudents();
    res.json({ students });
  }

  private getAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
    const teachers = await UserModel.findTeachers();
    res.json({ teachers });
  }

  private reloadUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.DimiAPIClient.reloadAllUsers();
      await this.DimiAPIClient.attachStudentInfo();
      res.end();
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  }
}

export default UserController;
