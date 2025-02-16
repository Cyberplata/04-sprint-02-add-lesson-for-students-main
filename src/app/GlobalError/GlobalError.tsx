import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { selectError } from '../app-selectors.ts'
import { useAppSelector } from '../store.ts'

export const GlobalError = () => {
  const errorMessage = useAppSelector(selectError)

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  return <ToastContainer theme="dark" autoClose={3000} />
}
