import { Controller } from '../interfaces';
import AuthController from './Auth';
import UserController from './User';

const controllers: Controller[] = [
  new AuthController(),
  new UserController(),
];

export default controllers;
