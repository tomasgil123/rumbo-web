import React from 'react'
import { useForm } from 'react-hook-form'

const LoginScreen = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false })
  const onSubmit = (data: any): void => console.log(data)

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
          <span className="text-white self-start pb-2">Usuario</span>
          <input
            className="mb-4 w-full outline-none bg-transparent border-b-2 border-white"
            {...register('user', { required: true })}
          />
          {errors.user && <span>Por favor, completa este campo con tu usuario</span>}
          <span className="text-white self-start pb-2">Contraseña</span>
          <input
            className="mb-4 w-full outline-none bg-transparent border-b-2 border-white"
            {...register('password', { required: true })}
          />
          {errors.password && <span>Por favor, completa este campo con tu contraseña</span>}
          <input
            className=" cursor-pointer rounded-lg w-40 p-2 bg-primary-light text-white font-bold"
            type="submit"
            value="Ingresar"
          />
        </form>
      </div>
    </div>
  )
}

export default LoginScreen
