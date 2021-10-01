import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
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
// services
import { sendAnswer } from 'services/answer'
import Spinner from 'components/spinner'

const Guideline = ({ guideline, survey }: GuidelineProps): JSX.Element => {
  const [approved, setApproved] = useState(false)
  const [givenPoints, setGivenPoints] = useState(0)
  const [errorOnSubmit, setErrorOnSubmit] = useState(false)
  const answer = survey.answers[guideline.pk]
    ? survey.answers[guideline.pk]
    : { tasks: [], guideline_pk: '', value: '', pk: '' }

  const cache = useQueryClient()

  const { mutate, error, isLoading } = useMutation(sendAnswer, {
    onMutate: (answer) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      cache.cancelQueries('initialDataDistributorId')
      // Snapshot the previous value
      const previousDistributorData = cache.getQueryData('initialDataDistributorId')
      // Optimistically update to the new value
      cache.setQueryData('initialDataDistributorId', (distributorData) => {
        ;(distributorData as any).data.answers[answer.guideline].value = answer.value
        return distributorData
      })
      return previousDistributorData
    },
    onError: (error, variables, previousDistributorData) => {
      // If the mutation fails, use the previousDistributorData returned from onMutate to roll back
      cache.setQueriesData('initialDataDistributorId', previousDistributorData)
    },
    onSettled: (data, error, answerResponse, previousDistributorData) => {
      // data is undefined. Why?
      if (!error) {
        cache.setQueryData('initialDataDistributorId', () => {
          ;(previousDistributorData as any).data.answers[answerResponse.guideline].value =
            answerResponse.value
          return previousDistributorData
        })
      } else {
        cache.setQueryData('initialDataDistributorId', () => previousDistributorData)
      }
    },
  })

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

  useEffect(() => {
    if (error) {
      toast.error('Ha ocurrido un erro al intentar guardar la respuesta al lineamiento')
      setErrorOnSubmit(true)
      setTimeout(() => {
        setErrorOnSubmit(false)
      }, 2000)
    }
  }, [error])

  const onAnswerGuideline = async (value: string | number): Promise<void> => {
    //TODO: add the name of the user which is sending the answer
    const answer = {
      guideline: guideline.pk,
      sent_by: '',
      survey: survey.pk,
      value: value,
    }
    mutate(answer)
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
      <span className={`${s.guidelinePk} text-center `}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {errorOnSubmit ? (
              <i className="icon-close  text-danger text-lg md:text-2xl" />
            ) : (
              <span className="underline font-bold text-primary">{guideline.pk}</span>
            )}
          </>
        )}
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
