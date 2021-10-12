import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
//components
import GuidelinePresentational from './guidelinePresentational'
// types
import { Guideline as GuidelineModel } from 'types/guideline'
import { SurveyActive } from 'types/survey'
interface GuidelineProps {
  guideline: GuidelineModel
  survey: SurveyActive
  distributorId: number
}
// services
import { sendAnswer } from 'services/answer'
// context
import { useChangesMade } from './changesMadeContext'
import { Answer } from 'types/answer'
// utils
import useInitialData from 'hooks/useInitialData'

const Guideline = ({ guideline, survey, distributorId }: GuidelineProps): JSX.Element => {
  const { userName } = useInitialData()
  const [errorOnSubmit, setErrorOnSubmit] = useState(false)
  const answer = survey.answers[guideline.pk]
    ? survey.answers[guideline.pk]
    : { tasks: [], guideline_pk: '', value: '', pk: '' }

  const cache = useQueryClient()

  const { setWereChangesMade } = useChangesMade()

  const { mutate, error, isLoading } = useMutation(sendAnswer, {
    onMutate: (answer) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      cache.cancelQueries(['initialDataDistributorId', distributorId])
      // Snapshot the previous value
      const previousDistributorData = cache.getQueryData([
        'initialDataDistributorId',
        distributorId,
      ])
      // Optimistically update to the new value
      cache.setQueryData(['initialDataDistributorId', distributorId], (distributorData) => {
        const copyDistributorData = JSON.parse(JSON.stringify(distributorData))
        copyDistributorData.data.answers[answer.guideline].value = answer.value
        return copyDistributorData
      })
      return previousDistributorData
    },
    onError: (error, variables, previousDistributorData) => {
      // If the mutation fails, use the previousDistributorData returned from onMutate to roll back
      cache.setQueriesData(['initialDataDistributorId', distributorId], previousDistributorData)
    },
    onSettled: (data, error, answerResponse, previousDistributorData) => {
      // data is undefined. Why?
      if (!error) {
        // we save in context that changes were made
        setWereChangesMade(true)
        toast.success('La respuesta al lineamiento se guardo correctamente')
        cache.setQueryData(['initialDataDistributorId', distributorId], () => {
          ;(previousDistributorData as any).data.answers[answerResponse.guideline].value =
            answerResponse.value
          return previousDistributorData
        })
      } else {
        cache.setQueryData(
          ['initialDataDistributorId', distributorId],
          () => previousDistributorData
        )
      }
    },
  })

  useEffect(() => {
    if (error) {
      toast.error('Ha ocurrido un error al intentar guardar la respuesta al lineamiento')
      setErrorOnSubmit(true)
      setTimeout(() => {
        setErrorOnSubmit(false)
      }, 2000)
    }
  }, [error])

  const onAnswerGuideline = async (value: string | number): Promise<void> => {
    if (survey.locked) {
      toast.error('La encuesta esta cerrada. No puede modificarse')
    } else {
      //TODO: add the name of the user which is sending the answer
      const answer = {
        guideline: guideline.pk,
        sent_by: userName as string,
        survey: survey.pk,
        value: value,
      }
      mutate(answer)
    }
  }

  return (
    <GuidelinePresentational
      answer={answer as Answer}
      guideline={guideline}
      isLoading={isLoading}
      errorOnSubmit={errorOnSubmit}
      onAnswerGuideline={onAnswerGuideline}
      isSurveyLocked={survey.locked}
    />
  )
}

export default Guideline
