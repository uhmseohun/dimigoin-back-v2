import jwt from "jsonwebtoken";
import IUser from "../interfaces/User";
import config from "../config";

export default {
  async verify(token: string) {
    try {
      const { identity }: any = await jwt.verify(
        token,
        config.jwtSecret as string
      );
      return identity;
    } catch (error) {
      throw new Error("토큰 검증 실패");
    }
  },

  async issue(identity: IUser, refresh: boolean) {
    if (!refresh) {
      const token = await jwt.sign({ identity }, config.jwtSecret as string, {
        algorithm: "HS256",
        expiresIn: "1w"
      });
      return token;
    } else {
      const token = await jwt.sign(
        {
          idx: identity.idx,
          refresh: true
        },
        config.jwtSecret as string
      );
      return token;
    }
  },
};
