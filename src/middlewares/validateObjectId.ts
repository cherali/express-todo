import mongoose from 'mongoose'
import type { NextFunction, Request, Response } from 'express'

export function validateObjectId(paramName: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName]))
      return res.createError(404, 'Invalid ID.')

    next()
  }
}
