import AuthController from './Auth';
import CircleController from './Circle';
import CircleApplicationController from './CircleApplication';
import CircleApplicationManagementController from './CircleApplicationManagement';
import CircleApplierSelection from './CircleApplierSelection';
import CircleManagementController from './CircleManagement';
import ConfigController from './Config';
import UserController from './User';
import AfterschoolController from './Afterschool';

const controllers = [
  new AuthController(),
  new UserController(),
  new CircleController(),
  new CircleManagementController(),
  new CircleApplicationController(),
  new CircleApplicationManagementController(),
  new CircleApplierSelection(),
  new ConfigController(),
  new AfterschoolController(),
];

export default controllers;
