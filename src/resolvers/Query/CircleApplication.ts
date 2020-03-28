import {
  CircleApplicationModel,
  CircleApplicationQuestionModel,
  CircleModel
} from "../../models";
import Auth from "../../resources/Auth";
import { IContext } from "../../interfaces/IContext";

export default {
  async applicationForm(_: any, {}, context: IContext) {
    await Auth.isLogin(context);
    const form = await CircleApplicationQuestionModel.find();
    return form;
  },
  async allApplications(_: any, {}, context: IContext) {
    await Auth.isTeacher(context);
    const applications = await CircleApplicationModel.find();
    return applications;
  },
  async applications(_: any, {}, context: IContext) {
    const circle = await Auth.isChairs(context);
    const applications = await CircleApplicationModel.findPopulatedByCircle(
      circle._id
    );
    return applications;
  }
};
