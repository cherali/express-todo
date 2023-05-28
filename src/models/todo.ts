import Joi from 'joi'
import mongoose, { SchemaDefinitionProperty } from 'mongoose'

interface ITodo {
  title: string
  status: string
  description: string
}

export const Todo = mongoose.model(
  'Todos',
  new mongoose.Schema<any, { _doc?: SchemaDefinitionProperty }>(
    {
      __v: {
        type: Number,
        select: false,
      },
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      status: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
        default: '',
        maxlength: 255,
      },
    },
    { versionKey: false, timestamps: true },
  ),
)

export function validateTodo(todo: ITodo) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    status: Joi.string(),
    description: Joi.string().optional().allow(''),
  })

  return schema.validate(todo)
}

export function validateUpdateTodo(todo: ITodo) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).optional().allow(''),
    status: Joi.string()
      .min(5)
      .max(50)
      .allow(...['completed', 'doing']),
    description: Joi.string().optional().allow(''),
  })

  return schema.validate(todo)
}
