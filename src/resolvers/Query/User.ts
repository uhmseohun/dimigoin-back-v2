import { UserModel } from "../../models/User";

export default {
  async me(_: any, {}, context: any) {
    if (context.isLogin) {
      return context.user;
    } else {
      throw new Error("로그인이 되어있지 않습니다.");
    }
  },
  async users() {
    const users = await UserModel.find();
    return users;
  },
  async user(_: any, { _id }: { _id: string }) {
    const user = await UserModel.findOne({ _id });
    return user;
  },
  async teachers() {
    const teachers = await UserModel.findTeachers();
    return teachers;
  },
  async students() {
    const students = await UserModel.findStudents();
    return students;
  }
};
