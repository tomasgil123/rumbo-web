import { Parser } from 'expr-eval'

import { STATUS_NEW } from 'utils/tasks'

// Lineamiento de un programa de auditoria
export default class Guideline {
  constructor(guidelineData, answer, isAudit) {
    this.isAudit = isAudit
    this.answer_type = guidelineData.answer_type
    this.evaluationLines = guidelineData.evaluation_lines || []
    this.code = guidelineData.code || ''
    this.title = guidelineData.title || ''
    this.answer_required = guidelineData.answer_required
    this.answer = answer
  }

  // Devuelve la linea de evaluacion aplicable a la respuesta dada para el lineamiento
  getEvaluationLineForAnswer() {
    let evaluationLine = {}

    if (this.answer_type === 'b') {
      evaluationLine = this.evaluationLines.filter(
        (x) => parseFloat(x.min_value) === parseFloat(this.answer.value)
      )[0]
    } else {
      evaluationLine = this.evaluationLines
        .filter((x) => parseFloat(x.min_value) <= parseFloat(this.answer.value))
        .sort((x, y) => parseFloat(y.min_value) - parseFloat(x.min_value))[0]
    }

    return evaluationLine || null
  }

  // Devuelve true si el lineamiento esta aprobado con la respuesta dada
  isApproved() {
    //If the answer belongs to a guideline which is of type lineamiento anual
    if (!this.answer_required && this.isAudit) {
      return true
    }

    const evaluationLine = this.getEvaluationLineForAnswer()

    return evaluationLine ? evaluationLine.approved : false
  }

  // Devuelve los puntos base del lineamiento
  getBasePoints() {
    if (!this.evaluationLines || this.evaluationLines.length === 0) {
      return 0
    }

    if (!this.answer_required && this.isAudit) {
      return 0
    }

    return this.evaluationLines
      .filter((x) => x.base_points)
      .map((x) => parseFloat(x.base_points))
      .reduce((x, y) => x + y, 0)
  }

  // Devuelve la cantidad de puntos otorgados en el lineamiento por la respuesta dada
  getGivenPoints() {
    //If there is no value in answer, the givenPoints of the guideline is equal to 0
    if (!this.answer.value) {
      return 0
    }

    //If the answer belongs to a guideline which is of type lineamiento anual
    if (!this.answer_required && this.isAudit) {
      return 0
    }

    const evaluationLine = this.getEvaluationLineForAnswer(this.answer)

    let givenPoints = 0
    if (evaluationLine) {
      const parser = new Parser()
      const formula = parser.parse(evaluationLine.given_points)
      givenPoints = formula.evaluate({ x: this.answer.value })
    }

    return givenPoints
  }

  // Crea una lsita con la tarea para el lineamiento si la respuesta no lo aprueba
  makeTasks(answer, survey) {
    if (this.isApproved() || survey.author_role === 'auditor') {
      return []
    } else {
      return [
        {
          pk: Date.now() * -1,
          survey_pk: answer.survey,
          guideline: answer.guideline,
          answer: answer,
          assigned_to: '',
          deadline: null,
          description: '',
          status: STATUS_NEW,
          title: `${this.code}-${this.title}`,
        },
      ]
    }
  }
}
