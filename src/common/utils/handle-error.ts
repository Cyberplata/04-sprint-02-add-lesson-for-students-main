import { isAxiosError } from 'axios'
import { setAppErrorAC } from '../../app/app-reducer.ts'
import type { AppDispatch } from '../../app/store.ts'

type ServerError = {
  errorMessages: Array<{ field: string; message: string }>
}

export const handleError = (e: Error, dispatch: AppDispatch) => {
  let errorMessage: string

  if (isAxiosError<ServerError>(e)) {
    dispatch(setAppErrorAC(errorMessage = e.response ? e.response.data.errorMessages[0].message : e.message))
  } else {
    dispatch(setAppErrorAC(errorMessage = (e as Error).message))
  }
  dispatch(setAppErrorAC(errorMessage))
}