import { ObjectId } from 'mongodb';

interface IAfterschoolApplication {
  afterschool: ObjectId;
  applier: ObjectId;
}

export default IAfterschoolApplication;
