import { Controller } from '../interfaces';

class AfterschoolController extends Controller {
  public basePath = '/afterschool';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}

export default AfterschoolController;
