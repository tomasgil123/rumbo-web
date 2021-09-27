import React, { useState, forwardRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
// services
import { updateTask } from 'services/task'
// components
import Spinner from 'components/spinner'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import { STATUS_NEW, STATUS_PENDING, STATUS_DONE } from 'utils/tasks'
// types
import { TaskStatusEnum } from 'types/tasks'

type TaskId = {
  taskId: string
}

// tenemos que gestionar los errores de una forma global
// no se si es el momento

// - tenemos que corregir los estilos de los inputs
// - tenemos que armar el sistemita de validacion con useForm
// - tenemos que enviar la request del update de la tarea y hacer
//   un update de la query que tiene los datos de las tareas
//   eso significa que todo el hook se triggerea de vuelta?
//   probablemente, pero no nos interesa porque aca solo vemos los datos
//   de la tarea

const DateInput = forwardRef<null>(
  ({ value, onClick }: any, ref): JSX.Element => (
    <button className="cursor-pointer w-40 p-2 border border-gray-300" onClick={onClick} ref={ref}>
      {value}
    </button>
  )
)

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
    control,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false })
  const onSubmit = async ({
    status,
    date,
    assignedPerson,
    description,
  }: {
    status: string
    date: string
    assignedPerson: string
    description: string
  }): Promise<void> => {
    setLoading(true)
    try {
      //const results = await updateTask()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setErrorOnSubmit(true)
    }
  }

  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="rounded shadow-lg p-4 bg-white">
        <div className="pb-8">
          <h4>Nombre del area</h4>
          <h2>Nombre de la tarea</h2>
        </div>
        <form
          className="flex justify-center flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row justify-start w-full">
            <div className="pb-4 flex-1 flex items-center ">
              <div className="font-bold  mr-2">
                <div className="w-14">Estado</div>
              </div>
              <select
                className="w-40 p-2 outline-none border border-gray-300"
                {...register('status')}
              >
                <option value={STATUS_NEW}>{TaskStatusEnum.new}</option>
                <option value={STATUS_PENDING}>{TaskStatusEnum.pending}</option>
                <option value={STATUS_DONE}>{TaskStatusEnum.done}</option>
              </select>
            </div>
            <div className="pb-4 flex-1 flex items-center">
              <div className="font-bold pr-2">
                <div className="w-14">Fecha</div>
              </div>
              <Controller
                render={({ field: { onChange, value } }): JSX.Element => (
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={value}
                    onChange={onChange}
                    customInput={<DateInput />}
                  />
                )}
                control={control}
                name="date"
                defaultValue={new Date()}
              />
            </div>
          </div>
          <span className="self-start pb-2 font-bold">Persona asignada</span>
          <input
            className="p-2 mb-4 w-full outline-none border border-gray-300"
            {...register('assignedPerson', { required: true })}
          />
          {errors.user && (
            <span className="text-danger">
              Por favor, completa este campo con el nombre de la persona responsable de la tarea
            </span>
          )}
          <span className="self-start pb-2 font-bold">Descripción</span>
          <textarea
            className="p-2 mb-4 w-full outline-none border border-gray-300"
            {...register('description', { required: true })}
          />
          {errors.password && (
            <span className="text-danger">
              Por favor, completa este campo con una breve descripción
            </span>
          )}
          {loading ? (
            <button className="cursor-not-allowed rounded-lg w-40 p-2 bg-primary-light">
              <Spinner />
            </button>
          ) : (
            <input
              className="h-12 cursor-pointer rounded-lg w-40 p-2 bg-primary-light text-white font-bold"
              type="submit"
              value="Guardar tarea"
            />
          )}
          {errorOnSubmit && (
            <span className="text-danger text-center">
              Ha ocurrido un error al intentar modificar esta tarea
            </span>
          )}
        </form>
      </div>
    </div>
  )
}

export default Task
