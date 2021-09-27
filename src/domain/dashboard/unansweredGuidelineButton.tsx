import { Link } from 'react-router-dom'

enum PageSections {
  dashboard = 'dashboard',
  tasks = 'tareas',
}
const UnansweredGuidelineButton = (): JSX.Element => {
  return (
    <div className="text-center">
      <Link
        className=" focus:text-white rounded-full py-3 px-6 text-white mb-4 mt-4 w-full outline-none bg-primary-dark border-b-2 border-white"
        to={`${PageSections.dashboard}/lineamientos-sin-contestar`}
      >
        Ver lineamientos faltantes
      </Link>
    </div>
  )
}

export default UnansweredGuidelineButton
