interface Props {
  bgColor: string
  icon: JSX.Element
}

const IconCircle = ({ bgColor, icon }: Props): JSX.Element => {
  const radius = 45
  return (
    <div className="relative flex items-center justify-center w-20 md:w-28 h-20 md:h-28">
      <div className="absolute font-bold text-base md:text-xl z-10">{icon}</div>
      <div className="relative w-20 md:w-28 h-20 md:h-28">
        <svg
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width={'100%'}
          height={'100%'}
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={`circle stroke-current ${bgColor}`}
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}

export default IconCircle
