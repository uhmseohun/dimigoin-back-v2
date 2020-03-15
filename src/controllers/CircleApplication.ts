import { NextFunction, Request, Response } from 'express'
import {
  CircleApplicationDeadlineException,
  CircleApplicationLimitException,
  CircleApplicationNotFoundException,
  CircleApplicationQuestionException,
  ConflictedCircleApplicationException,
  NotPassedCircleSelectionException
} from '../exceptions/CircleApplication'
import { AlreadySelectedApplierException } from '../exceptions/CircleApplierSelection'
import {
  Controller,
  ICircleApplication
} from '../interfaces'
import { CheckUserType } from '../middlewares'
import {
  CircleApplicationModel,
  CircleApplicationQuestionModel
} from '../models'
import { ConfigKeys } from '../types'

class CircleApplicationController extends Controller {
  public basePath = '/circle/application';

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.get('/', CheckUserType(['S']), this.wrapper(this.getApplicationStatus))
    this.router.post('/', CheckUserType(['S']),
      this.validator(this.requiredKeys.createApplication),
      this.wrapper(this.createApplication))
    this.router.post('/final/:circleId', CheckUserType(['S']), this.wrapper(this.finalSelection))
  }

  private getApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req)
    const applications =
      await CircleApplicationModel.findByApplier(user._id)
    res.json({
      maxApplyCount: (await this.config)[ConfigKeys.circleMaxApply],
      applications
    })
  }

  private createApplication = async (req: Request, res: Response, next: NextFunction) => {
    const config = await this.config
    if (!config[ConfigKeys.circleAppliable]) throw new CircleApplicationDeadlineException()
    const user = this.getUserIdentity(req)
    const applied = await CircleApplicationModel.findByApplier(user._id)
    const application: ICircleApplication = req.body
    application.applier = user._id

    if (applied.find((v) => v.status === 'final')) {
      throw new AlreadySelectedApplierException()
    }

    if (applied.length >= config[ConfigKeys.circleMaxApply]) {
      throw new CircleApplicationLimitException()
    }

    if (applied.map((v) => v.circle.toString()).includes(application.circle.toString())) {
      throw new ConflictedCircleApplicationException()
    }

    const answeredIds: string[] = Object.keys(application.form).sort()
    const questions = await CircleApplicationQuestionModel.find()
    const questionIds = questions.map((v) => v._id.toString()).sort()
    if (JSON.stringify(answeredIds) !== JSON.stringify(questionIds)) {
      throw new CircleApplicationQuestionException()
    }

    const invalidAnswers = questions.filter((question) => {
      const id: string = question._id.toString()
      const answer: string = application.form[id]
      return question.maxLength < answer.length || answer.length === 0
    })
    if (invalidAnswers.length > 0) {
      throw new CircleApplicationQuestionException()
    }

    await CircleApplicationModel.create(application)
    res.json({ application })
  }

  private finalSelection = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUserIdentity(req)
    const applied = await CircleApplicationModel.findByApplier(user._id)

    if (applied.filter((v) => v.status === 'final').length > 0) {
      throw new AlreadySelectedApplierException()
    }

    const final =
      applied.find((v) => v.circle.toString() === req.params.circleId)

    if (!final) {
      throw new CircleApplicationNotFoundException()
    }

    if (final.status !== 'pass') {
      throw new NotPassedCircleSelectionException()
    }

    final.status = 'final'
    await final.save()
    res.json({ application: final })
  }
}

export default CircleApplicationController
