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
    <div>
      Login
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
          <input {...register('password', { required: true })} />
          {errors.password && <span>This field is required</span>}
          <input type="submit" value="Ingresar" />
        </form>
      </div>
    </div>
  )
}

export default LoginScreen
