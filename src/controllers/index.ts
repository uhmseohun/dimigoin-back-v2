import { Controller } from '../interfaces';
import AuthController from './Auth';
import CircleController from './Circle';
import UserController from './User';

const controllers: Controller[] = [
  new AuthController(),
  new UserController(),
  new CircleController(),
];

export default controllers;
