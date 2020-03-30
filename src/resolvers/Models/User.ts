import { CircleApplicationModel, CircleModel } from '../../models';
import { ObjectId } from 'mongodb';

export default {
  async appliedCircles({ _id }: { _id: ObjectId }) {
    const applications = await CircleApplicationModel.findByApplier(_id);
    const circles = await Promise.all(
      applications.map(async application => {
        const circle = await CircleModel.findById(application.circle);
        return circle;
      }),
    );
    return circles;
  },
};
