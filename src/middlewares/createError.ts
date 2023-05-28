import type { NextFunction, Request, Response } from 'express'

export function createError(req: Request, res: Response, next: NextFunction) {
  // attached a function to res
  res.createError = function (statusCode, msg) {
    this.status(statusCode).send({ errorCode: statusCode, message: msg })
  }

  next()
}
