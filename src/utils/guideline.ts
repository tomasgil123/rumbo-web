export type EvaluationLine = string[] | []
interface EvaluationLines {
  cleanDescription: string
  evaluationLines: EvaluationLine
}

export const getEvaluationLinesFromDescription = (
  guidelineDescription: string
): EvaluationLines => {
  let cleanDescription = ''
  let evaluationLines: EvaluationLine = []
  const indexFirstAsterisk = guidelineDescription.indexOf('*')
  if (indexFirstAsterisk > -1) {
    try {
      cleanDescription = guidelineDescription.slice(0, indexFirstAsterisk)
      const evaluationLinesText = guidelineDescription
        .slice(indexFirstAsterisk, -1)
        .replace(/(\r\n|\n|\r)/gm, '')
      const listOfEvalutationLines = evaluationLinesText.split('*').filter((text) => text)
      evaluationLines = listOfEvalutationLines
    } catch (err) {
      cleanDescription = guidelineDescription
    }
  } else {
    cleanDescription = guidelineDescription
  }
  return {
    cleanDescription,
    evaluationLines,
  }
}
