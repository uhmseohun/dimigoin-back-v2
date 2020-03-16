import { Request, Response, NextFunction } from 'express'
import { BodyValidationFailException } from '../exceptions/Validation'

export default (requiredKeys: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (requiredKeys.length === 0) return next()
    const invalidKeys = requiredKeys.split(', ').filter((key) => {
      return !Object.hasOwnProperty.call(req.body, key)
    })
    if (invalidKeys.length > 0) {
      throw new BodyValidationFailException(invalidKeys)
    } else { next() }
  }
}
