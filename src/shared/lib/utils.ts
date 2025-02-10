export class ResponseError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export const validate = (schema: any, request: any) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  })

  if (result.error) {
    throw new ResponseError(400, result.error.message)
  } else {
    return result.value
  }
}
