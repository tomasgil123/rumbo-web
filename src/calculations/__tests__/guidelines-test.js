import Guideline from '../guidelines'

describe('Guidelie.getEvaluationLineForAnswer', function () {
  it('returns null for guideline without evaluation lines', function () {
    const guidelineData = {}
    const answer = { value: '42' }
    const evaluationLine = new Guideline(guidelineData, answer).getEvaluationLineForAnswer()

    expect(evaluationLine).toEqual(null)
  })

  it('returns evaluation line for guideline with one evaluation line', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1.00',
          approved: true,
          base_points: '1.00',
        },
      ],
    }
    const answer0 = { value: '0.00' }
    const evaluationLine0 = new Guideline(guidelineData, answer0).getEvaluationLineForAnswer()

    expect(evaluationLine0).toEqual(null)

    const answer1 = { value: '1.00' }
    const evaluationLine1 = new Guideline(guidelineData, answer1).getEvaluationLineForAnswer()

    expect(evaluationLine1).toEqual(guidelineData.evaluation_lines[0])
  })

  it('returns evaluation line for guideline with one evaluation line', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '10.00',
          given_points: '1.00',
          approved: true,
          base_points: '1.00',
        },
        { min_value: '20.00', given_points: '2.00', approved: true, base_points: '0' },
        { min_value: '30.00', given_points: '3.00', approved: true, base_points: '0' },
      ],
    }
    const answer = { value: '21.00' }
    const evaluationLine0 = new Guideline(guidelineData, answer).getEvaluationLineForAnswer()

    expect(evaluationLine0).toEqual({
      min_value: '20.00',
      given_points: '2.00',
      approved: true,
      base_points: '0',
    })
  })
})

describe('Guidelie.getGivenPoints', function () {
  it('gets the given points with fixed value', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '10.00',
          given_points: '1.00',
          approved: true,
          base_points: '1.00',
        },
        { min_value: '20.00', given_points: '2.00', approved: true, base_points: '0' },
        { min_value: '30.00', given_points: '3.00', approved: true, base_points: '0' },
      ],
    }
    const answer = { value: '21.00' }

    const givenPoints = new Guideline(guidelineData, answer).getGivenPoints()

    expect(givenPoints).toEqual(2.0)
  })

  it('gets the given points with fixed formula', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '10.00',
          given_points: '1.00 + 2.00',
          approved: true,
          base_points: '3.00',
        },
        {
          min_value: '20.00',
          given_points: '2.00 + 3.00',
          approved: true,
          base_points: '0',
        },
        {
          min_value: '30.00',
          given_points: '3.00 + 4.00',
          approved: true,
          base_points: '0',
        },
      ],
    }
    const answer = { value: '21.00' }

    const givenPoints = new Guideline(guidelineData, answer).getGivenPoints()

    expect(givenPoints).toEqual(5.0)
  })

  it('gets the given points with variable formula', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '10.00',
          given_points: '1.00 + 2.00',
          approved: true,
          base_points: '3.00',
        },
        {
          min_value: '20.00',
          given_points: '(x - 2.00) * 3.00 + 1.1',
          approved: true,
          base_points: '0',
        },
        {
          min_value: '30.00',
          given_points: '100 - (x / 2) * x + 1.0',
          approved: true,
          base_points: '0',
        },
      ],
    }
    const answer21 = { value: '21.00' }

    const givenPoints21 = new Guideline(guidelineData, answer21).getGivenPoints()

    expect(givenPoints21).toEqual(58.1)

    const answer42 = { value: '42.00' }

    const givenPoints42 = new Guideline(guidelineData, answer42).getGivenPoints()

    expect(givenPoints42).toEqual(-781)
  })

  it('returns 0 if answer_required = false and survey_prefix = Evaluación', function () {
    const guidelineData = {
      answer_required: false,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    }

    const givenPoints = new Guideline(
      guidelineData,
      { value: '42.00' },
      'Evaluación'
    ).getGivenPoints()
    expect(givenPoints).toEqual(0)
  })

  it('returns 42 if answer_required = false and survey_prefix = Pre-Evaluación', function () {
    const guidelineData = {
      answer_required: false,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '42.00',
          approved: true,
          base_points: '42.00',
        },
      ],
    }

    const givenPoints = new Guideline(
      guidelineData,
      { value: '42.00' },
      'Pre-Evaluación'
    ).getGivenPoints()
    expect(givenPoints).toEqual(42)
  })

  it('returns 0 if answer does not have value', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '10.00',
          given_points: '1.00 + 2.00',
          approved: true,
          base_points: '3.00',
        },
        {
          min_value: '20.00',
          given_points: '(x - 2.00) * 3.00 + 1.1',
          approved: true,
          base_points: '0',
        },
        {
          min_value: '30.00',
          given_points: '100 - (x / 2) * x + 1.0',
          approved: true,
          base_points: '0',
        },
      ],
    }

    const givenPoints = new Guideline(guidelineData, {}).getGivenPoints()
    expect(givenPoints).toEqual(0)
  })
})

describe('Guideline.getBasePoints', function () {
  it('return 0 when there are no evaluation lines', function () {
    const guidelineData = {}

    const basePoints = new Guideline(guidelineData).getBasePoints()

    expect(basePoints).toEqual(0)
  })

  it('return 0 if answer_required = false and survey_prefix = Evaluación', function () {
    const guidelineData = {
      answer_required: false,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    }

    const basePoints = new Guideline(guidelineData, {}, 'Evaluación').getBasePoints()

    expect(basePoints).toEqual(0)
  })

  it('return 1 if answer_required = false and survey_prefix = Pre-Evaluación', function () {
    const guidelineData = {
      answer_required: false,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    }

    const basePoints = new Guideline(guidelineData, {}, 'Pre-Evaluación').getBasePoints()

    expect(basePoints).toEqual(1)
  })

  it('return 0 when there are no base points', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '10.00',
          given_points: '0.00',
          approved: true,
          base_points: '0.00',
        },
        {
          min_value: '20.00',
          given_points: '0.00',
          approved: true,
          base_points: '0.00',
        },
      ],
    }

    const basePoints = new Guideline(guidelineData).getBasePoints()

    expect(basePoints).toEqual(0)
  })

  it('return 10 when there are one line with 10 base points', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '10.00',
          given_points: '10.00',
          approved: true,
          base_points: '10.00',
        },
        {
          min_value: '20.00',
          given_points: '0.00',
          approved: true,
          base_points: '0.00',
        },
      ],
    }

    const basePoints = new Guideline(guidelineData).getBasePoints()

    expect(basePoints).toEqual(10)
  })

  it('return the sum of the base points of all the evaluation lines', function () {
    const guidelineData = {
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '10.00',
          given_points: '10.00',
          approved: true,
          base_points: '10.00',
        },
        {
          min_value: '20.00',
          given_points: '20.00',
          approved: true,
          base_points: '20.00',
        },
      ],
    }

    const basePoints = new Guideline(guidelineData).getBasePoints()

    expect(basePoints).toEqual(30)
  })
})
