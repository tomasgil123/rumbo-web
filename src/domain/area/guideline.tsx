import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
//components
import AnswerInput from 'components/answerInput'
// utils
import GuidelineCal from 'calculations/guidelines'
// styles
import s from './guideline.module.scss'
// types
import { Guideline as GuidelineModel } from 'types/guideline'
import { SurveyActive } from 'types/survey'
// constants
import { STATUS_NEW, STATUS_PENDING } from 'utils/tasks'
interface GuidelineProps {
  guideline: GuidelineModel
  survey: SurveyActive
}

// - hacer service contestar lineamiento y agregar spinner o icono de error
// - mostrar algun tipo de toaster si la request falla

const Guideline = ({ guideline, survey }: GuidelineProps): JSX.Element => {
  console.log('guideline', guideline)
  console.log('answer', survey.answers[guideline.pk])

  const [approved, setApproved] = useState(false)
  const [givenPoints, setGivenPoints] = useState(0)

  const answer = survey.answers[guideline.pk]
    ? survey.answers[guideline.pk]
    : { tasks: [], guideline_pk: '', value: '', pk: '' }

  useEffect(() => {
    const guidelineItem = new GuidelineCal(guideline, answer)
    if (guidelineItem.isApproved()) {
      if (guidelineItem.getGivenPoints() % 1 !== 0) {
        setGivenPoints(Number(guidelineItem.getGivenPoints().toFixed(2)))
      } else {
        setGivenPoints(guidelineItem.getGivenPoints())
      }
    } else {
      setGivenPoints(0)
    }
    setApproved(guidelineItem.isApproved())
  }, [])

  const onAnswerGuideline = (value: string | number): void => {
    console.log('value', value)
  }

  const givenPointsStyles = cx('rounded-full h-12 w-12 border-2 flex items-center justify-center', {
    'border-success text-success': approved,
    'border-gray-400 text-gray-400': !approved,
  })

  const taskIconStyles =
    answer.tasks.length > 0
      ? cx('icon-note text-xl md:text-3xl', {
          'text-danger-orange': answer.tasks[0].status === STATUS_NEW,
          'text-primary-light': answer.tasks[0].status === STATUS_PENDING,
        })
      : ''

  return (
    <div className={` ${s.grid} bg-white shadow-md w-full p-2 md:p-4 my-2 md:my-3 rounded-lg`}>
      <span className={`${s.guidelinePk} text-center underline font-bold text-primary`}>
        {guideline.pk}
      </span>
      <div className={`${s.required}`}>
        {guideline.required && (
          <span className="px-2 py-1 bg-danger-orange text-white rounded">Pasa / no pasa</span>
        )}
      </div>
      <div className={`${s.text}`}>
        <div>{guideline.name}</div>
        <div>{guideline.description}</div>
      </div>
      <div className={`${s.answer} flex flex-row `}>
        <div className="flex-1">
          <AnswerInput
            screen={'area'}
            value={answer.value}
            onChange={onAnswerGuideline}
            answerType={guideline.answer_type}
            guidelineDescription={guideline.description}
          />
        </div>
        <div className="flex-1 flex flex-row justify-around items-center">
          <span className={givenPointsStyles}>{givenPoints}</span>
          {answer.tasks.length > 0 &&
            (answer.tasks[0].status === STATUS_NEW ||
              answer.tasks[0].status === STATUS_PENDING) && (
              <Link to={`/tareas/${guideline.pk}`}>
                <i className={taskIconStyles} />
              </Link>
            )}
        </div>
      </div>
    </div>
  )
}

export default Guideline
