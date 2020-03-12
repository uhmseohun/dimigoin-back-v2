import { Controller } from '../interfaces';
import AuthController from './Auth';

const controllers: Controller[] = [
  new AuthController(),
];

export default controllers;
