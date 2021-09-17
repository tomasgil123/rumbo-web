import { Link } from 'react-router-dom'
import { Task as TaskModel } from 'types/tasks'

// styles
import s from './taskCard.module.scss'

interface TaskCardModel {
  task: TaskModel
  icon: string
}
const TaskCard = ({ task, icon }: TaskCardModel): JSX.Element => {
  return (
    <Link to={`tareas/${task.pk}`}>
      <div className="flex flex-row bg-white items-start shadow-md h-36 w-full p-2 md:w-100 my-2 rounded-lg">
        <span className="w-20 text-center ">{task.guidelinePk}</span>
        <div className="flex flex-col justify-center w-full md:w-60 px-4 ">
          <h1 className="uppercase">{task.guidelineName}</h1>
          <ul className="text-disabled text-sm">
            <li>Limite: {task.deadline}</li>
            <li>Persona asignada: {task.assigned_to}</li>
            <li className={`${s.description} truncate`}>Descripción: {task.description}</li>
          </ul>
        </div>
        <div className="w-20 text-center ml-auto">
          <i className={icon} />
        </div>
      </div>
    </Link>
  )
}

export default TaskCard
