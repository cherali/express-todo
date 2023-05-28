import express, { Request, Response } from 'express'
import _ from 'lodash'
import {
  Todo,
  validateTodo as validate,
  validateUpdateTodo as validateUpdate,
} from '../models/todo'
import { validateObjectId } from '../middlewares/validateObjectId'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  // #swagger.tags = ['Todo']
  const todos = await Todo.find().sort('name')
  res.send(todos)
})

router.post('/', [], async (req: Request, res: Response) => {
  // #swagger.tags = ['Todo']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a Todo',
        required: true,
        schema: { $ref: "#/definitions/AddTodo" }
      } 
  */

  const params = req.body

  const { error } = validate(params)
  if (error) return res.createError(400, error.details[0].message)

  const todo = new Todo({
    title: params.title,
    status: params.status,
    description: params.description,
  })

  await todo.save()

  res.send(todo)
})

router.put(
  '/:todoId',
  [validateObjectId('todoId')],
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Todo']

    /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Update a Todo',
          required: true,
          schema: { $ref: "#/definitions/UpdateTodo" }
        } 
    */

    const params = req.body

    const { error } = validateUpdate(params)
    if (error) return res.createError(400, error.details[0].message)

    const todoId = req.params.todoId

    const newTodo = {
      title: params.title,
      status: params.status,
      description: params.description,
    }

    const todo = await Todo.findOne({ _id: todoId })
    if (!todo)
      return res.createError(404, 'The todo with the given ID was not found.')

    await todo?.updateOne(_.pickBy(newTodo, _.identity))

    res.send({ ...todo._doc, ..._.pickBy(newTodo, _.identity) })
  },
)

router.delete(
  '/:todoId',
  [validateObjectId('todoId')],
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Todo']

    const todo = await Todo.findByIdAndRemove(req.params.todoId)

    if (!todo)
      return res.createError(404, 'The todo with the given ID was not found.')

    res.send(todo)
  },
)

router.get(
  '/:todoId',
  [validateObjectId('todoId')],
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Todo']

    const todo = await Todo.findById(req.params.todoId)

    if (!todo)
      return res.createError(404, 'The todo with the given ID was not found.')

    res.send(todo)
  },
)

export { router as todoRoutes }
