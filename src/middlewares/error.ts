import { logger } from '../startup/logging'
import type { Request, Response } from 'express'

export function error(err: Error, req: Request, res: Response) {
  logger.error(err.message, err)
  res.sendStatus(500).send('Something failed.')
}
