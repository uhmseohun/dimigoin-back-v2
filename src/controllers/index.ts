import { Controller } from '../interfaces';
import AuthController from './Auth';
import CircleController from './Circle';
import CircleApplicationController from './CircleApplication';
import CircleApplicationManagementController from './CircleApplicationManagement';
import CircleManagementController from './CircleManagement';
import UserController from './User';

const controllers: Controller[] = [
  new AuthController(),
  new UserController(),
  new CircleController(),
  new CircleManagementController(),
  new CircleApplicationController(),
  new CircleApplicationManagementController(),
];

export default controllers;
