declare namespace Express {
  export interface Response {
    createError(statusCode: number, message: string): void
  }
}
