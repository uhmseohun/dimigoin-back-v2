import {
  CircleApplicationModel,
  CircleApplicationQuestionModel,
  CircleModel,
} from '../../models';
import Auth from '../../resources/Auth';
import { IContext } from '../../interfaces/IContext';
import { ConfigKeys, CirclePeriod } from '../../types';
import { getConfig } from '../../resources/Config';

export default {
  async applicationForm(_: any, {}, context: IContext) {
    await Auth.isLogin(context);
    const form = await CircleApplicationQuestionModel.find();
    return form;
  },
  async allApplications(_: any, { page }: { page: number }, context: IContext) {
    await Auth.isTeacher(context);
    const applications = await CircleApplicationModel.find()
      .skip((page - 1) * 30)
      .limit(30);
    return applications;
  },
  async applications(_: any, {}, context: IContext) {
    const circle = await Auth.isChairs(context);
    const applications = await CircleApplicationModel.findPopulatedByCircle(
      circle._id,
    );
  return applications;
},
  async myApplications(_: any, {}, context: IContext) {
    await Auth.isLogin(context);
    const period = (await getConfig())[ConfigKeys.circlePeriod];
    const applications = await CircleApplicationModel.findByApplier(
      context.user._id,
    );
    const mappedApplications = await Promise.all(
      applications.map(async (application) => {
        if (period === CirclePeriod.application) application.status = 'applied';
        else if (
          period === CirclePeriod.interview &&
          application.status.includes('interview')
        ) {
          application.status = 'document-pass';
        }
        const circle = await CircleModel.findById(application.circle)
          .populate('chair', ['name', 'serial'])
          .populate('viceChair', ['name', 'serial']);
        application.circle = circle;
        return application;
      }),
    );
    return mappedApplications;
  },
};
