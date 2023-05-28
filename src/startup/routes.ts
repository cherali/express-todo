import type { Application } from 'express'
import { error } from '../middlewares/error'
import { todoRoutes } from '../routes/todos'

const routes = (app: Application) => {
  app.use(`/api/todo`, todoRoutes)

  app.get('*', (req, res) => {
    res.createError(404, 'Not Found')
  })

  app.use(error)
}

export default routes
