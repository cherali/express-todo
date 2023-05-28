import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: '1.0.0',
    title: 'TODOS API',
    description: '',
  },
  host: 'localhost:4000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Todo',
      description: '',
    },
  ],
  definitions: {
    AddTodo: {
      $title: 'title',
      status: 'completed | doing',
      description: '',
    },
    UpdateTodo: {
      $title: 'title',
      $status: 'completed | doing',
      $description: '',
    },
  },
}

const outputFile = './src/swagger-output.json'
const endpointsFiles = ['./src/startup/routes.ts']

// import t from ''

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger doc generated')
})
