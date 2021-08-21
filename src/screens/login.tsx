import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// services
import { login } from 'services/session'
// utils
import { setLocalAccessToken, setLocalRefreshToken } from 'utils/session'
// components
import Spinner from 'components/spinner'

const LoginScreen = (): JSX.Element => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false })
  const onSubmit = async ({
    user,
    password,
  }: {
    user: string
    password: string
  }): Promise<void> => {
    setLoading(true)
    try {
      const results = await login(user, password)
      const { access, refresh } = results.data
      setLocalAccessToken(access)
      setLocalRefreshToken(refresh)
      setLoading(false)
      history.push('/dashboard')
    } catch (err) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className="h-full bg-primary-dark">
      <div className="flex justify-center flex-col items-center px-4 max-w-xs mx-auto">
        <img
          className="w-40 md:w-60 mb-4 md:mb-6"
          src={process.env.PUBLIC_URL + '/pepsico_logo_white.png'}
        />
        <img
          className="w-60 md:w-96 mb-6 md:mb-10"
          src={process.env.PUBLIC_URL + '/rumbo_logo.png'}
        />
        <form
          className="flex justify-center flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="text-white self-start pb-2 font-bold">Usuario</span>
          <input
            className=" focus:text-white text-white mb-4 w-full outline-none bg-transparent border-b-2 border-white"
            {...register('user', { required: true })}
          />
          {errors.user && (
            <span className="text-danger">Por favor, completa este campo con tu usuario</span>
          )}
          <span className="text-white self-start pb-2 font-bold">Contraseña</span>
          <input
            className="focus:text-white text-white mb-6 w-full outline-none bg-transparent border-b-2 border-white"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-danger">Por favor, completa este campo con tu contraseña</span>
          )}
          {loading ? (
            <button className="cursor-not-allowed rounded-lg w-40 p-2 bg-primary-light">
              <Spinner />
            </button>
          ) : (
            <input
              className="h-12 cursor-pointer rounded-lg w-40 p-2 bg-primary-light text-white font-bold"
              type="submit"
              value="Ingresar"
            />
          )}
          {error && (
            <span className="text-danger text-center">
              Ha ocurrido un error al intentar loguearte
            </span>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginScreen
