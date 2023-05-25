import { async } from '@firebase/util'
import { Dispatch } from 'redux'
import {
  IRegisterUserData,
  ILoginWithEmailPasswordData,
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  signInWithGoogle,
  logoutFirebase,
} from '../../firebase/providers'
// import { clearNotesLogout } from '../journal'
import { checkingCredentials, logout, login } from './authSlice'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

export const checkingAuthentication = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if (!result.ok)
      return dispatch(
        logout({ message: result.errorMessage, code: null, type: 'error' })
      )

    dispatch(
      login({
        displayName: result.displayName || '',
        email: result.email || '',
        photoURL: result.photoURL || '',
        uid: result.uid || '',
      })
    )
  }
}

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: IRegisterUserData) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    })

    if (!result.ok)
      return dispatch(
        logout({ message: result.errorMessage, code: null, type: 'error' })
      )

    dispatch(
      login({
        displayName: result.displayName || '',
        email: result.email || '',
        photoURL: result.photoURL || '',
        uid: result.uid || '',
      })
    )
  }
}

export const startLoginWithEmailPassword = ({
  email,
  password,
}: ILoginWithEmailPasswordData) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailPassword({ email, password })

    if (!result.ok)
      return dispatch(
        logout({ message: result.errorMessage, code: null, type: 'error' })
      )

    dispatch(
      login({
        displayName: result.displayName || '',
        email: result.email || '',
        photoURL: result.photoURL || '',
        uid: result.uid || '',
      })
    )
  }
}

export const startLogout = () => {
  return async (dispatch: Dispatch) => {
    await logoutFirebase()
    // dispatch(clearNotesLogout())
    dispatch(logout({ message: 'Logout', code: null, type: 'success' }))
  }
}

export const startResetPassword = (email: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())
    const auth = getAuth()

    // sendPasswordResetEmail(auth, email)
    //   .then(() => {
    //     dispatch(logout({ errorMessage: 'Email enviado!' }))
    //   })
    //   .catch((error: Error) => {
    //     if (typeof error.message === 'string') {
    //       dispatch(logout({ errorMessage: error.message }))
    //     } else if (error instanceof Error) {
    //       dispatch(logout({ errorMessage: 'Algo salió mal' }))
    //     }
    //   })

    try {
      const result = await sendPasswordResetEmail(auth, email)
      dispatch(
        logout({ message: 'Email enviado!', code: null, type: 'success' })
      )
    } catch (error: unknown) {
      let messageError = 'Algo salió mal'
      if (error instanceof Error) {
        messageError = error.message
      }
      dispatch(logout({ message: messageError, code: null, type: 'error' }))
    }
  }
}
