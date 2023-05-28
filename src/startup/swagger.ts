import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger-output.json'

export function swagger(app: Application) {
  // disable swagger ui in production mode
  if (process.env.NODE_ENV !== 'production') {
    app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }
}
