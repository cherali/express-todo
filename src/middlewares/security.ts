import type { Application } from 'express'
import helmet from 'helmet'

import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'

export function security(app: Application) {
  // Set security HTTP headers
  app.use(helmet())

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize())

  // Data sanitization against XSS
  app.use(xss())

  // Prevent parameter pollution
  app.use(
    hpp({
      whitelist: [],
    }),
  )
}
