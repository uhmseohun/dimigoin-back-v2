import { Controller } from '../interfaces';

class AfterschoolApplicationController extends Controller {
  public basePath = '/afterschool/application';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}

export default AfterschoolApplicationController;
