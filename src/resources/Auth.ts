import { IContext } from "../interfaces/IContext";
import { CircleModel } from "../models";

export default {
  async isLogin(context: IContext) {
    if (!context.isLogin) {
      throw new Error("인증된 사용자가 아닙니다.");
    }
  },
  async isStudent(context: IContext) {
    await this.isLogin(context);
    if (!(context.user.userType === "S")) {
      throw new Error("학생이 아닙니다.");
    }
  },
  async isTeacher(context: IContext) {
    await this.isLogin(context);
    if (!(context.user.userType === "T")) {
      throw new Error("선생님이 아닙니다.");
    }
  },
  async isChairs(context: IContext) {
    const circle = await CircleModel.findByChairs(context.user._id);
    if (!circle) throw new Error('동아리장만 접근 가능합니다.');
    return circle;
  }
};
