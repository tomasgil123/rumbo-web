import React, { useState, forwardRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
// services
import { updateTask } from 'services/task'
// components
import Spinner from 'components/spinner'
import AnswerTaskInput, { inRange } from 'components/answerInput'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useRefetchQuery from 'hooks/useRefetchQuery'
import { STATUS_NEW, STATUS_PENDING, STATUS_DONE } from 'utils/tasks'
// types
import { TaskStatus, Task as TaskModel } from 'types/tasks'
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
import { Area } from 'types/area'
import { Guideline } from 'types/guideline'

type GuidelinePk = {
  guidelinePk: string
}

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
  const [wereChangesMade, setWereChangesMade] = useState(false)
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey, refetch } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )

  // when the user leaves the area screen we want to refetch the
  // initialDataDistributorId query
  useRefetchQuery(wereChangesMade, refetch)

  const task: TaskModel | '' = survey ? ((survey as SurveyActive).tasks as any)[guidelinePk][0] : ''
  const area: Area | '' = task ? (auditProgram as AuditProgram).areas[task.areaPk] : ''
  const guideline: Guideline | '' = task
    ? (auditProgram as AuditProgram).guidelines[task.guidelinePk]
    : ''

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
      await updateTask(taskUpdate, answerTask)
      setWereChangesMade(true)
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

  const inRangeValue = (value: string): boolean => {
    return inRange(
      Number(value),
      (guideline as Guideline).value_min,
      (guideline as Guideline).value_max
    )
  }

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
                <option value={STATUS_NEW}>{TaskStatus.new}</option>
                <option value={STATUS_PENDING}>{TaskStatus.pending}</option>
                <option value={STATUS_DONE}>{TaskStatus.done}</option>
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
          <span className="self-start pb-2 font-bold">Descripci??n</span>
          <textarea
            className="rounded p-2 mb-4 w-full outline-none border border-gray-300"
            {...register('description', { required: true })}
          />
          {errors.description && (
            <span className="text-danger mb-4 text-left w-full">
              Por favor, completa este campo con una breve descripci??n
            </span>
          )}
          <div className="self-start">
            {!isTaskDisabled && (
              <Controller
                render={({ field: { onChange, value } }): JSX.Element => (
                  <AnswerTaskInput
                    guidelineDescription={(guideline as Guideline).description}
                    screen="task"
                    answerType={answerType}
                    value={value}
                    onChange={onChange}
                  />
                )}
                control={control}
                rules={{ required: true, validate: inRangeValue }}
                name="answerTask"
              />
            )}
          </div>
          {errors.answerTask && (
            <span className="text-danger mb-4 text-left w-full">
              {`El valor no puede ser menor a ${(guideline as Guideline).value_min} o mayor a ${
                (guideline as Guideline).value_max
              }`}
            </span>
          )}
          {!isTaskDisabled && (
            <>
              {loading ? (
                <button className="cursor-not-allowed rounded-lg w-40 p-2 bg-primary-light">
                  <Spinner />
                </button>
              ) : (
                <input
                  className="h-12 mt-4 cursor-pointer rounded-lg w-40 p-2 bg-primary-light text-white font-bold"
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
