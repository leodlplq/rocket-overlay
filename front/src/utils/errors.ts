import { ApiError } from '#types/error'

const hasError = (errors: ApiError[] | null | undefined, name: string) => {
  if (errors) {
    return errors.some((error) => error.field === name)
  }
  return false
}

const getError = (errors: ApiError[] | null, name?: string) => {
  const error = errors?.find((error) => error.field === name)
  if (error) {
    return error
  }
  if (errors && errors.length <= 1 && errors[0].field === undefined) {
    return errors[0]
  }
  return null
}

export { getError, hasError }
