import express, { Application } from 'express'
import cors from 'cors'
import { createError } from '../middlewares/createError'
import { security } from '../middlewares/security'

export function middleware(app: Application) {
  // parse application/json
  app.use(express.json())

  // add cors policy
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }

  app.use(cors(corsOptions))

  // add createError function to request
  app.use(createError)

  // importing app security
  security(app)
}
