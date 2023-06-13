import {toast, Slide} from 'react-toastify'

export const toastSuccess = (
  message = 'Success',
  position = toast.POSITION.TOP_CENTER,
): void => {
  toast.success(message, {
    position,
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  })
}

export const toastError = (
  message = 'Something went wrong!',
  position = toast.POSITION.TOP_CENTER,
): void => {
  toast.error(typeof message === 'object' ? JSON.stringify(message) : message, {
    position,
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  })
}
