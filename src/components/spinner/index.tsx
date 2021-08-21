import s from './index.module.scss'
const Spinner = (): JSX.Element => {
  return (
    <div className=" flex justify-center items-center">
      <div
        className={`${s.loader} ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8`}
      ></div>
    </div>
  )
}

export default Spinner
