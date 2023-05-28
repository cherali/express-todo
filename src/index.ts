import express, { Application } from 'express'
import { logger } from './startup/logging'

import { middleware } from './startup/middleware'
import { database } from './startup/db'
import routes from './startup/routes'
import { swagger } from './startup/swagger'

const app: Application = express()
const port = process.env.PORT || 4000

swagger(app)
middleware(app)
database()
routes(app)

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`)
})
