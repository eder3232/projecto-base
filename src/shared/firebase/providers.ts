import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'

import { firebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result)
    const user = result.user
    const { displayName, email, photoURL, uid } = user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    }
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    const name = error.name //name = "FirebaseError"
    // The email of the user's account used.
    const email = error.customData.email
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
    return {
      ok: false,
      errorCode,
      errorMessage,
      email,
      credential,
      name,
    }
  }
}

export interface IRegisterUserData {
  email: string
  password: string
  displayName: string
}

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: IRegisterUserData) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )

    if (firebaseAuth.currentUser) {
      updateProfile(firebaseAuth.currentUser, { displayName })
    }

    const { uid, photoURL } = resp.user

    return { ok: true, uid, displayName, email, photoURL }
  } catch (error: any) {
    return { ok: false, errorMessage: error.message }
  }
}

export interface ILoginWithEmailPasswordData {
  email: string
  password: string
}

export const loginWithEmailPassword = async ({
  email,
  password,
}: ILoginWithEmailPasswordData) => {
  try {
    const resp = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const { uid, photoURL, displayName } = resp.user
    return { ok: true, uid, displayName, email, photoURL }
  } catch (error: any) {
    return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async () => {
  return await firebaseAuth.signOut()
}
