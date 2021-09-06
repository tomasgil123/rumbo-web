import { Link } from 'react-router-dom'
import { Task as TaskModel } from 'types/tasks'

interface myProps {
  task: TaskModel
  icon: string
}
const TaskPresentation = ({ task, icon }: myProps): JSX.Element => {
  return (
    <Link to={`tareas/${task.pk}`}>
      <div className="flex flex-row items-start shadow-md h-40 w-full p-2 md:w-72">
        <span className="w-20 text-center ">{task.guidelinePk}</span>
        <div className="flex flex-col justify-center w-56 px-4 ">
          <h1 className="uppercase">{task.guidelineName}</h1>
          <ul className="text-disabled">
            <li>Limite:{task.deadline}</li>
            <li>Persona asignada:{task.assigned_to}</li>
            <li className="truncate">escripción:{task.description}</li>
          </ul>
        </div>
        <div className="w-20 text-center ml-auto">
          <i className={icon} />
        </div>
      </div>
    </Link>
  )
}

export default TaskPresentation
