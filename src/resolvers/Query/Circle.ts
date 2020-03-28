import { CircleModel, CircleApplicationModel } from "../../models";
import { ConfigKeys, CirclePeriod } from "../../types";
import { getConfig } from "../../resources/Config";
import Auth from "../../resources/Auth";

export default {
  async circle(_: any, { _id }: { _id: string }, context: any) {
    const circle = await CircleModel.findById(_id);
    const applicationstatus = await CircleApplicationModel.findOne({
      circle: _id,
      applier: context.user._id
    });
    if (applicationstatus == null) {
      circle.applied = false;
    }
    if (applicationstatus != null) {
      circle.applied = true;
    }
    return circle;
  },
  async circles(_: any, {}, context: any) {
    await Auth.isStudent(context);
    const applications = await CircleApplicationModel.findByApplier(
      context.user._id
    );
    const appliedIds = await Promise.all(
      applications.map(application => application.circle.toString())
    );
    const circleModels = await CircleModel.find();
    const circles = await Promise.all(
      circleModels.map(circle => {
        if (appliedIds.includes(circle._id.toString())) {
          circle.applied = true;
        }
        return circle;
      })
    );
    return circles;
  },
  async appliedCircles(_: any, { _id }: { _id: string }, context: any) {
    await Auth.isStudent(context);
    const period = (await getConfig())[ConfigKeys.circlePeriod];
    const applications = await CircleApplicationModel.findByApplier(
      context.user._id
    );
    const mappedApplications = await Promise.all(
      applications.map(async application => {
        if (period === CirclePeriod.application) application.status = "applied";
        else if (
          period === CirclePeriod.interview &&
          application.status.includes("interview")
        ) {
          application.status = "document-pass";
        }
        return application;
      })
    );
    return mappedApplications;
  }
};
