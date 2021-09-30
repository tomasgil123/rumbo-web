import React from 'react'
import cx from 'classnames'
interface HandsSelectProps {
  value: any
  onChange: any
}

const HandsSelect = ({ value, onChange }: HandsSelectProps): JSX.Element => {
  const likeStyles = cx('icon-like cursor-pointer text-sm md:text-2xl', {
    'text-success': value === '1.00',
    'text-disabled': value !== '1.00',
  })
  const circleLikeStyles = cx('rounded-full h-12 w-12 border-2 flex items-center justify-center', {
    'border-success': value === '1.00',
    'border-disabled text-disabled': value !== '1.00',
  })
  const dislikeStyles = cx('icon-dislike cursor-pointer text-sm md:text-2xl', {
    'text-danger': value === '0',
    'text-disabled': value !== '0',
  })
  const circleDislikeStyles = cx(
    'rounded-full h-12 w-12 border-2 flex items-center justify-center',
    {
      'border-danger': value === '0',
      'border-disabled text-disabled': value !== '0',
    }
  )

  return (
    <div className="w-full flex flex-row justify-around">
      <span className={circleLikeStyles}>
        <i className={likeStyles} onClick={(): void => onChange('1.00')} />
      </span>
      <span className={circleDislikeStyles}>
        <i className={dislikeStyles} onClick={(): void => onChange('0')} />
      </span>
    </div>
  )
}

export default HandsSelect
