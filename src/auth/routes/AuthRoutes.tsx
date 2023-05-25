import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'
import ResetPassword from '../pages/ResetPassword'

type Props = {}

const AuthRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="reset" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}

export default AuthRoutes
