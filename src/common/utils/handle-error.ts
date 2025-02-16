import { isAxiosError } from 'axios'
import { Dispatch } from 'redux'

type ServerError = {
  errorMessages: Array<{ field: string; message: string }>
}

export const handleError = (e: Error, dispatch: Dispatch) => {
  let errorMessage: string

  if (isAxiosError<ServerError>(e)) {
    errorMessage = e.response ? e.response.data.errorMessages[0].message : e.message
  } else {
    errorMessage = (e as Error).message
  }

  console.log(errorMessage)
}