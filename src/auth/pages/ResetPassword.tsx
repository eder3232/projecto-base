import React, { useMemo } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'

import AuthLayout from '../layout/AuthLayout'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { startResetPassword } from '../../shared/store/auth/thunks'

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
})

const ResetPassword = (props: Props) => {
  const authState = useAppSelector((state) => state.auth)

  const { status, feedback } = authState

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      if (!formik.isValid) return
      if (!!isAuthenticating) return
      dispatch(startResetPassword(values.email))
    },
    validationSchema: LoginFormSchema,
  })

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <Grid container gap={2} p={2}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Recupera tu cuenta
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
            <Grid container spacing={2}>
              <Grid item xs={12} display={!!feedback.message ? '' : 'none'}>
                <Alert severity={feedback.type || 'info'}>
                  {feedback.message}
                </Alert>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!formik.isValid || isAuthenticating}
                >
                  Reestablecer
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Link
                  color="inherit"
                  href="/auth/login"
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(deleteMessageError())
                    navigate('/auth/login')
                  }}
                >
                  ¿Tienes tu contraseña?
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
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

export default ResetPassword
