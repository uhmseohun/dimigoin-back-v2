import { UserModel } from "../../models";

export default {
  async chair({ chair }: any) {
    const user = await UserModel.findById(chair._id);
    return user;
  },
  async viceChair({ viceChair }: any) {
    const user = await UserModel.findById(viceChair._id);
    return user;
  }
};
