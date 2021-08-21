import Survey from '../surveys'
import StatisticsHelpers from '../statisticsHelpers'

const audit_program = {
  areas: {
    20: {
      pk: 20,
      module_pks: [10, 11],
      required_points: 50,
      sum_only_if_approved: true,
    },
    21: {
      pk: 21,
      module_pks: [12],
      required_points: 50,
      essential: true,
      sum_only_if_approved: true,
    },
  },
  modules: {
    10: {
      pk: 10,
      guideline_pks: [1, 2],
      required_points: 50,
      module_type: 'g',
      sum_only_if_approved: false,
    },
    11: {
      pk: 11,
      guideline_pks: [3, 4, 5],
      required_points: 50,
      module_type: 'g',
      sum_only_if_approved: false,
    },
    12: {
      pk: 12,
      guideline_pks: [6],
      required_points: 50,
      module_type: 'p',
      sum_only_if_approved: false,
    },
  },
  guidelines: {
    1: {
      pk: 1,
      required: true,
      answer_type: 'b',
      answer_required: false,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    },
    2: {
      pk: 2,
      required: false,
      answer_type: 'b',
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    },
    3: {
      pk: 3,
      required: false,
      answer_type: 'b',
      answer_required: false,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    },
    4: {
      pk: 4,
      required: true,
      answer_type: 'b',
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    },
    5: {
      pk: 5,
      required: false,
      answer_type: 'b',
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    },
    6: {
      pk: 6,
      required: false,
      answer_type: 'b',
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '1',
          approved: true,
          base_points: '1.00',
        },
      ],
    },
  },
}

describe('Survey.getBasePoints', function () {
  it('returns 4 example with guidelines with answer_required = false and survey_prefix = Evaluación', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
      },
      2: {
        guideline_pk: 2,
        value: '1.00',
      },
      3: {
        guideline_pk: 3,
        value: '1.00',
      },
      4: {
        guideline_pk: 4,
        value: '1.00',
      },
    }

    //all areas in a program are part of a survey
    const areas = Object.values(audit_program.areas)

    const surveyItem = new Survey(
      { isAudit: true },
      audit_program.guidelines,
      answers,
      areas,
      audit_program.modules
    )

    expect(surveyItem.getBasePoints()).toBe(4)
  })

  it('returns 5 example with guidelines with answer_required = false and survey_prefix = Pre-Evaluación', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
      },
      2: {
        guideline_pk: 2,
        value: '1.00',
      },
      3: {
        guideline_pk: 3,
        value: '1.00',
      },
      4: {
        guideline_pk: 4,
        value: '1.00',
      },
    }
    //all areas in a program are part of a survey
    const areas = Object.values(audit_program.areas)

    const area_module_pks = areas.map((areaItem) => areaItem.module_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, area_module_pks)

    const surveyItem = new Survey(
      { prefix: 'Pre-Evaluación' },
      audit_program.guidelines,
      answersComplete,
      areas,
      audit_program.modules
    )

    expect(surveyItem.getBasePoints()).toBe(5)
  })
})

describe('Survey.isApproved', function () {
  it('returns false if not all modules of type g are approved', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '0',
      },
      2: {
        guideline_pk: 2,
        value: '0',
      },
      3: {
        guideline_pk: 3,
        value: '0',
      },
      4: {
        guideline_pk: 4,
        value: '0',
      },
      5: {
        guideline_pk: 4,
        value: '1.00',
      },
      6: {
        guideline_pk: 4,
        value: '1.00',
      },
    }

    //all areas in a program are part of a survey
    const areas = Object.values(audit_program.areas)

    const area_module_pks = areas.map((areaItem) => areaItem.module_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, area_module_pks)

    const surveyItem = new Survey(
      { prefix: 'Pre-Evaluación' },
      audit_program.guidelines,
      answersComplete,
      areas,
      audit_program.modules
    )

    expect(surveyItem.isApproved()).toBe(false)
  })

  it('returns true if all modules of type g are approved', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
      },
      2: {
        guideline_pk: 2,
        value: '1.00',
      },
      3: {
        guideline_pk: 3,
        value: '1.00',
      },
      4: {
        guideline_pk: 4,
        value: '1.00',
      },
      5: {
        guideline_pk: 5,
        value: '1.00',
      },
      6: {
        guideline_pk: 6,
        value: '0',
      },
    }

    //all areas in a program are part of a survey
    const areas = Object.values(audit_program.areas)

    const surveyItem = new Survey(
      { prefix: 'Pre-Evaluación' },
      audit_program.guidelines,
      answers,
      areas,
      audit_program.modules
    )

    expect(surveyItem.isApproved()).toBe(true)
  })
})

describe('Survey.getGivenPoints', function () {
  it('returns 0 if not all essential areas are approved', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
      },
      2: {
        guideline_pk: 2,
        value: '1.00',
      },
      3: {
        guideline_pk: 3,
        value: '1.00',
      },
      4: {
        guideline_pk: 4,
        value: '1.00',
      },
      5: {
        guideline_pk: 5,
        value: '1.00',
      },
      6: {
        guideline_pk: 6,
        value: '0',
      },
    }

    const areas = Object.values(audit_program.areas)

    const surveyItem = new Survey(
      { prefix: 'Pre-Evaluación' },
      audit_program.guidelines,
      answers,
      areas,
      audit_program.modules
    )

    expect(surveyItem.getGivenPoints()).toBe(0)
  })

  it('returns 6 if all essential areas are approved', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
      },
      2: {
        guideline_pk: 2,
        value: '1.00',
      },
      3: {
        guideline_pk: 3,
        value: '1.00',
      },
      4: {
        guideline_pk: 4,
        value: '1.00',
      },
      5: {
        guideline_pk: 5,
        value: '1.00',
      },
      6: {
        guideline_pk: 6,
        value: '1.00',
      },
    }

    const areas = Object.values(audit_program.areas)

    const surveyItem = new Survey(
      { prefix: 'Pre-Evaluación' },
      audit_program.guidelines,
      answers,
      areas,
      audit_program.modules
    )

    expect(surveyItem.getGivenPoints()).toBe(6)
  })

  it('returns 1 guidelines as not approved', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '0',
      },
      2: {
        guideline_pk: 2,
        value: '0',
      },
      3: {
        guideline_pk: 3,
        value: '1.00',
      },
      4: {
        guideline_pk: 4,
        value: '1.00',
      },
      5: {
        guideline_pk: 5,
        value: '1.00',
      },
      6: {
        guideline_pk: 6,
        value: '1.00',
      },
    }

    const areas = Object.values(audit_program.areas)

    const surveyItem = new Survey(
      { prefix: 'Pre-Evaluación' },
      audit_program.guidelines,
      answers,
      areas,
      audit_program.modules
    )

    expect(surveyItem.countUnapprovedGuidelines()).toBe(2)
  })
})
