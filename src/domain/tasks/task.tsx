import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
// services
import { updateTask } from 'services/task'
// components
import Spinner from 'components/spinner'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'

type TaskId = {
  taskId: string
}

// tenemos que gestionar los errores de una forma

const Task = (): JSX.Element => {
  const { taskId } = useParams<TaskId>()

  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )

  // con el taskid nos traemos los datos de la tarea
  // y completamos los campos que sean necesarios
  // el usuario tendria que poder acceder a cualquier tarea

  const [errorOnSubmit, setErrorOnSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
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
      const results = await updateTask()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setErrorOnSubmit(true)
    }
  }

  return (
    <div>
      <form
        className="flex justify-center flex-col items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="text-white self-start pb-2 font-bold">Usuario</span>
        <input
          className=" focus:text-white text-white mb-4 w-full outline-none bg-primary-dark border-b-2 border-white"
          {...register('status', { required: true })}
        />
        {errors.user && (
          <span className="text-danger">Por favor, completa este campo con tu usuario</span>
        )}
        <span className="text-white self-start pb-2 font-bold">Contraseña</span>
        <input
          className="focus:text-white text-white mb-6 w-full outline-none bg-primary-dark border-b-2 border-white"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <span className="text-danger">Por favor, completa este campo con tu contraseña</span>
        )}
        <input
          className="focus:text-white text-white mb-6 w-full outline-none bg-primary-dark border-b-2 border-white"
          {...register('assignedPerson', { required: true })}
        />
        {errors.password && (
          <span className="text-danger">Por favor, completa este campo con tu contraseña</span>
        )}
        <textarea
          className="focus:text-white text-white mb-6 w-full outline-none bg-primary-dark border-b-2 border-white"
          {...register('description', { required: true })}
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
        {errorOnSubmit && (
          <span className="text-danger text-center">
            Ha ocurrido un error al intentar modificar esta tarea
          </span>
        )}
      </form>
    </div>
  )
}

export default Task
