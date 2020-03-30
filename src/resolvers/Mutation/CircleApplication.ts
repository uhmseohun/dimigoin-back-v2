import { getConfig } from '../../resources/Config';
import { ConfigKeys, CircleApplicationStatus, CirclePeriod } from '../../types';
import { IContext } from '../../interfaces/IContext';
import {
  CircleApplicationModel,
  CircleApplicationQuestionModel,
  UserModel,
} from '../../models';
import { ICircleApplication } from '../../interfaces';
import { ICircleApplicationSetStatus } from '../../interfaces/CircleApplication';
import Auth from '../../resources/Auth';

export default {
  async createApplication(
    _: any,
    { input: application }: { input: ICircleApplication },
    context: IContext,
  ) {
    await Auth.isStudent(context);

    const config = await getConfig();

    if (config[ConfigKeys.circlePeriod] !== 'APPLICATION') {
      throw new Error('동아리 지원 기간이 아닙니다.');
    }

    const applied = await CircleApplicationModel.findByApplier(
      context.user._id,
    );

    if (applied.length >= config[ConfigKeys.circleMaxApply]) {
      throw new Error('지원 가능한 동아리 개수를 초과해 지원했습니다.');
    }

    if (
      applied
        .map((v) => v.circle.toString())
        .includes(application.circle.toString())
    ) {
      throw new Error('같은 동아리에 두 번 이상 지원할 수 없습니다.');
    }

    const answeredIds: string[] = Object.keys(application.form).sort();
    const questions = await CircleApplicationQuestionModel.find();
    const questionIds = questions.map((v) => v._id.toString()).sort();
    if (JSON.stringify(answeredIds) !== JSON.stringify(questionIds)) {
      throw new Error('지원서 양식이 올바르지 않습니다.');
    }

    const invalidAnswers = questions.filter((question) => {
      const id: string = question._id.toString();
      const answer: string = application.form[id];
      return question.maxLength < answer.length || answer.length === 0;
    });
    if (invalidAnswers.length > 0) {
      throw new Error('지원서 양식이 올바르지 않습니다.');
    }

    const newApplication = await CircleApplicationModel.create({
      ...application,
      applier: context.user._id,
    });

    return newApplication;
  },
  async setApplicationStatus(
    _: any,
    { input }: { input: ICircleApplicationSetStatus },
    context: IContext,
  ) {
    await Auth.isStudent(context);

    const applier = await UserModel.findById(input.applierId);
    if (!applier) throw new Error('해당 학생을 찾을 수 없습니다.');

    const circle = await Auth.isChairs(context);

    const application = await CircleApplicationModel.findByCircleApplier(
      circle._id,
      applier._id,
    );
    if (!application) throw new Error('해당 지원서가 존재하지 않습니다.');

    const status: CircleApplicationStatus = input.status;
    const period = (await getConfig())[ConfigKeys.circlePeriod];

    if (
      (period === CirclePeriod.application && !status.includes('document')) ||
      (period === CirclePeriod.interview && !status.includes('interview')) ||
      period === CirclePeriod.final
    ) {
      throw new Error('현재 지원자의 상태로 설정할 수 없는 상태입니다.');
    }
    application.status = status;

    const newApplication = await application.save();

    return newApplication;
  },
};
