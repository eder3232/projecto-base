import React, { useMemo } from 'react'
import { Link as RouterLink, redirect, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google'
import AuthLayout from '../layout/AuthLayout'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from '../../shared/store/auth/thunks'

import {
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/hooks/reduxHooks'
import { deleteMessageError } from '../../shared/store/auth/authSlice'

type Props = {}

const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('El email es requerido.'),
  password: yup
    .string()
    .min(6, 'Debe tener al menos 6 caracteres.')
    .max(50, 'Debe tener máximo 50 caracteres.')
    .required('La contraseña es requerida'),
})

const LoginPage = (props: Props) => {
  const authState = useAppSelector((state) => state.auth)

  const { status, feedback } = authState

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      if (!formik.isValid) return
      if (!!isAuthenticating) return
      dispatch(
        startLoginWithEmailPassword({
          email: values.email,
          password: values.password,
        })
      )
    },
    validationSchema: LoginFormSchema,
  })

  const onGoogleSignIn = (): void => {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <Grid container gap={2} p={2}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="on"
              label="Correo"
              type="email"
              placeholder="Correo"
              fullWidth
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="on"
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.errors.password}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} display={!!feedback.message ? '' : 'none'}>
                <Alert
                  severity={feedback.type === null ? 'info' : feedback.type}
                >
                  {feedback.message}
                </Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!formik.isValid || isAuthenticating}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticating}
                >
                  <GoogleIcon />
                  <Typography>Google</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Link
                  color="inherit"
                  href="/auth/reset"
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(deleteMessageError())
                    navigate('/auth/reset')
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <Link
                  color="inherit"
                  component={RouterLink}
                  to="/auth/register"
                >
                  ¿Aún no tienes una cuenta? Registrate
                </Link> */}
                <Link
                  color="inherit"
                  href="/auth/register"
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(deleteMessageError())
                    navigate('/auth/register')
                  }}
                >
                  ¿Aún no tienes una cuenta? Registrate
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
