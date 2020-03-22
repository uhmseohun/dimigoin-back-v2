import { NextFunction, Request, Response } from 'express'
import {
  CircleApplicationLimitException,
  CircleApplicationNotFoundException,
  CircleApplicationQuestionException,
  ConflictedCircleApplicationException,
  NotPassedCircleSelectionException,
  NoCircleApplicationPeriod
} from '../exceptions/CircleApplication'
import { AlreadySelectedApplierException } from '../exceptions/CircleApplierSelection'
import { ICircleApplication } from '../interfaces'
import { Controller } from '../classes'
import {
  CircleApplicationModel,
  CircleApplicationQuestionModel
} from '../models'
import { ConfigKeys, CirclePeriod } from '../types'
import Route from '../resources/RouteGenerator'

class CircleApplicationController extends Controller {
  public basePath = '/circle/application';

  constructor () {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.get('/',
      Route(['S'], this.requiredKeys.none, this.getApplicationStatus))
    this.router.post('/',
      Route(['S'], this.requiredKeys.createApplication, this.createApplication))
    this.router.patch('/final/:circleId',
      Route(['S'], this.requiredKeys.none, this.finalSelection))
  }

  private getApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    const period = (await this.config)[ConfigKeys.circlePeriod]
    const user = this.getUserIdentity(req)
    const applications = await CircleApplicationModel.findByApplier(user._id)
    const mappedApplications = await Promise.all(
      applications.map(application => {
        if (period === CirclePeriod.application) application.status = 'applied'
        else if (period === CirclePeriod.interview &&
                application.status.includes('interview')) {
          application.status = 'document-pass'
        }
        return application
      }))
    res.json({
      maxApplyCount: (await this.config)[ConfigKeys.circleMaxApply],
      applications: mappedApplications
    })
  }

  private createApplication = async (req: Request, res: Response, next: NextFunction) => {
    const config = await this.config

    if (config[ConfigKeys.circlePeriod] !== 'APPLICATION') {
      throw new NoCircleApplicationPeriod()
    }

    const user = this.getUserIdentity(req)
    const applied = await CircleApplicationModel.findByApplier(user._id)
    const application: ICircleApplication = req.body
    application.applier = user._id

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

    const final = applied.find((v) => v.circle.toString() === req.params.circleId)

    if (!final) throw new CircleApplicationNotFoundException()

    const period = (await this.config)[ConfigKeys.circlePeriod]

    if (period !== CirclePeriod.final || final.status !== 'interview-pass') {
      throw new NotPassedCircleSelectionException()
    }

    final.status = 'final'
    await final.save()
    res.json({ application: final })
  }
}

export default CircleApplicationController
