import { Link } from 'react-router-dom'
import { Task as TaskModel } from 'types/tasks'

interface myProps {
  task: TaskModel
  icon: string
}
const TaskPresentation = ({ task, icon }: myProps): JSX.Element => {
  return (
    <Link to={`tareas/${task.pk}`}>
      <div className="flex flex-row justify-between items-start shadow-md w-full py-2 md:w-72">
        <span className="w-20 justify-self-center">{task.guidelinePk}</span>
        <div className="flex flex-col justify-center px-4">
          <h1 className="uppercase">{task.guidelineName}</h1>
          <ul className="text-disabled">
            <li>limite:{task.deadline}</li>
            <li>persona asignada:{task.assigned_to}</li>
            <li>descripcion:{task.description}</li>
          </ul>
        </div>
        <div className="w-20  ">
          <i className={icon} />
        </div>
      </div>
    </Link>
  )
}

export default TaskPresentation
