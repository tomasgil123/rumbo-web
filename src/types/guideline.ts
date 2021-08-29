export interface EvaluationLine {
  min_value: string
  given_points: string
  approved: boolean
  base_points: string
}

export interface GuidelineRaw {
  pk: number
  code: string
  name: string
  description: string
  required: boolean
  answer_type: string
  answer_required: boolean
  value_min: string
  value_max: string
  position: number
  approved: boolean
  given_points: number
  answers: []
  attachments: []
  evaluation_lines: EvaluationLine[]
  tasks: []
}

export interface Guideline extends GuidelineRaw {
  modulePk: number
  areaPk: number
}
