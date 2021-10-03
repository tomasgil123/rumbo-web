const EvalautionLines = (evaluationLines: string[] | []): JSX.Element | null => {
  try {
    return (
      <div className="flex flex-col item-center pb-4">
        {evaluationLines.map((evaluationLine, index) => (
          <span className="text-xs text-primary" key={index}>{`${evaluationLine
            .split('>')[0]
            .replace(/\s+/g, ' ')
            .trim()} = ${evaluationLine.split('>')[1].replace(/\s+/g, ' ').trim()}`}</span>
        ))}
      </div>
    )
  } catch (err) {
    return null
  }
}

export default EvalautionLines
