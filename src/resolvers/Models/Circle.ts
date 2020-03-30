import { CircleApplicationModel, UserModel } from '../../models';
import Auth from '../../resources/Auth';
import { IContext } from '../../interfaces/IContext';

export default {
  async chair({ chair }: any) {
    const user = await UserModel.findById(chair._id);
    return user;
  },
  async viceChair({ viceChair }: any) {
    const user = await UserModel.findById(viceChair._id);
    return user;
  },
  async applier({ _id }: any, {}, context: IContext) {
    try {
      await Auth.isTeacher(context);
      const applications = await CircleApplicationModel.findPopulatedByCircle(
        _id,
      );
      return applications.length;
    } catch {
      return null;
    }
  },
};
