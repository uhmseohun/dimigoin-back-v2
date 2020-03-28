import { UserModel } from "../../models";
import DimiAPI from "../../resources/DimiAPI";
import Token from "../../resources/Token";
import { IUser } from "../../interfaces";

export default {
  async login(
    _: any,
    { username, password }: { username: string; password: string }
  ) {
    try {
      const { id: idx } = await DimiAPI.getIdentity({ username, password });
      const identity = (await UserModel.findByIdx(idx)) as IUser;
      return {
        accessToken: Token.issue(identity, false),
        refreshToken: Token.issue(identity, true),
        user: identity
      };
    } catch {
      throw new Error("해당 사용자를 찾을 수 없습니다.");
    }
  }
};
