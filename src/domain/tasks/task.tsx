import React, { useState, forwardRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
// services
import { updateTask } from 'services/task'
// components
import Spinner from 'components/spinner'
import AnswerTaskInput from './answerTaskInput'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import { STATUS_NEW, STATUS_PENDING, STATUS_DONE } from 'utils/tasks'
// types
import { TaskStatusEnum, Task as TaskModel } from 'types/tasks'
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
import { Area } from 'types/area'
type GuidelinePk = {
  guidelinePk: string
}

// - tenemos que enviar la request del update de la tarea y hacer
//   un update de la query que tiene los datos de las tareas
//   eso significa que todo el hook se triggerea de vuelta?
//   probablemente, pero no nos interesa porque aca solo vemos los datos
//   de la tarea

// no hacemos ningun update de las queries
// cuando el usuario sale de esta route hjacemos un update
// de las queries

const DateInput = forwardRef<null>(
  ({ value, onClick }: any, ref): JSX.Element => (
    <button
      className="cursor-pointer rounded w-40 p-2 border border-gray-300"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  )
)

const Task = (): JSX.Element => {
  const { guidelinePk } = useParams<GuidelinePk>()

  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )

  const task: TaskModel | '' = survey ? ((survey as SurveyActive).tasks as any)[guidelinePk][0] : ''
  const area: Area | '' = task ? (auditProgram as AuditProgram).areas[task.areaPk] : ''
  console.log('task', task)
  console.log('survey', survey)
  const taskDate = task ? (task.deadline ? new Date(task.deadline) : new Date()) : new Date()
  const answerType = task ? task.answerType : 'b'
  const isTaskDisabled = task ? task.status === STATUS_DONE : true

  const [errorOnSubmit, setErrorOnSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: false,
    defaultValues: {
      status: task ? task.status : '0',
      assignedPerson: task ? task.assigned_to : '',
      description: task ? task.description : '',
      date: taskDate,
      answerTask: '',
    },
  })
  const onSubmit = async ({
    status,
    date,
    assignedPerson,
    description,
    answerTask,
  }: {
    status: string
    date: string
    assignedPerson: string
    description: string
    answerTask: string | number
  }): Promise<void> => {
    setLoading(true)
    try {
      const taskUpdate = {
        pk: task ? task.pk : 0,
        status,
        description,
        assigned_to: assignedPerson,
        deadline: date,
      }
      const results = await updateTask(taskUpdate, answerTask)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setErrorOnSubmit(true)
    }
  }

  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>Ha ocurrido un error</div>

  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="rounded shadow-lg p-4 md:p-6 bg-white">
        <div className="pb-8">
          <h4 className="text-xs text-primary pb-2 font-bold">{area && area.name}</h4>
          <h2>{task && task.guidelineName}</h2>
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
                className="rounded w-40 p-2 outline-none border border-gray-300"
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
                    minDate={new Date()}
                  />
                )}
                control={control}
                name="date"
                defaultValue={taskDate}
              />
            </div>
          </div>
          <span className="self-start pb-2 font-bold">Persona asignada</span>
          <input
            className="rounded p-2 mb-4 w-full outline-none border border-gray-300"
            {...register('assignedPerson', { required: true })}
          />
          {errors.assignedPerson && (
            <span className="text-danger mb-4 text-left w-full">
              Por favor, completa este campo con el nombre de la persona responsable de la tarea
            </span>
          )}
          <span className="self-start pb-2 font-bold">Descripción</span>
          <textarea
            className="rounded p-2 mb-4 w-full outline-none border border-gray-300"
            {...register('description', { required: true })}
          />
          {errors.description && (
            <span className="text-danger mb-4 text-left w-full">
              Por favor, completa este campo con una breve descripción
            </span>
          )}
          {!isTaskDisabled && (
            <Controller
              render={({ field: { onChange, value } }): JSX.Element => (
                <AnswerTaskInput answerType={answerType} value={value} onChange={onChange} />
              )}
              control={control}
              name="answerTask"
            />
          )}

          {!isTaskDisabled && (
            <>
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
            </>
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
