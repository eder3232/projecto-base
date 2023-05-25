import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthRoutes from '../../auth/routes/AuthRoutes'
import MainApp from '../../mainApp/pages/MainApp'
import CheckingAuth from '../components/UIElements/CheckingAuth'
import { firebaseAuth } from '../firebase/config'
import { useAppSelector } from '../store/hooks/reduxHooks'
import { useDispatch } from 'react-redux'
import { login, logout } from '../store/auth/authSlice'
import MainRoutes from '../../mainApp/routes/MainRoutes'

export const AppRouter = () => {
  const { status } = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()

  //Verificacion de si hay un usuario logueado
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user)
        return dispatch(
          logout({ message: 'No hay usuario', code: null, type: 'error' })
        )
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      )
    })
  }, [])

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        //Rutas para usuarios autenticados
        <Route path="/*" element={<MainRoutes />} />
      ) : (
        //Rutas para usuarios no autenticados
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      {/* Capturando otras rutas */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}
      {/* <Route path="/*" element={<MainApp />} /> */}
    </Routes>
  )
}

// export const AppRouter = () => {
//     const status = useCheckAuth()

//     if (status === 'checking') {
//       return <CheckingAuth />
//     }

//   return (
//     <Routes>
//        {status === 'authenticated' ? (
//          <Route path="/*" element={<JournalRoutes />} />
//        ) : (
//          <Route path="/auth/*" element={<AuthRoutes />} />
//        )
//        <Route path="/*" element={<Navigate to="/auth/login" />} /
//        {/* Login y Registro */}
//        {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */
//        {/* JournalApp */}
//        <Route path="/*" element={ <JournalRoutes /> } />
//     </Routes>
//   )
// }
