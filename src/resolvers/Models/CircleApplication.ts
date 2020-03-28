import { UserModel, CircleModel } from "../../models";

export default {
  async circle({ circle }: { circle: string }) {
    const Circle = await CircleModel.findById(circle);
    return Circle;
  },
  async applier({ applier }: { applier: string }) {
    const user = await UserModel.findById(applier);
    return user;
  }
};
