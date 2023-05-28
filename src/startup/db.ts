import config from 'config'
import mongoose, { ConnectOptions } from 'mongoose'
import { logger } from './logging'

const mongooseOptions: ConnectOptions = {}

export async function database() {
  const db = config.get<string>('db')

  await mongoose
    .connect(db, mongooseOptions)
    .then(() => logger.info(`Connected to ${db}...`))
    .catch(err => logger.error(err))
}
