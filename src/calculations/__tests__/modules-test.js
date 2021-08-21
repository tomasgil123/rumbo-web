import Module from '../modules'
import StatisticsHelpers from '../statisticsHelpers'

const audit_program = {
  guidelines: {
    1: {
      pk: 1,
      required: true,
      answer_type: 'b',
      answer_required: true,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '2',
          approved: true,
          base_points: '2.00',
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
          given_points: '30',
          approved: true,
          base_points: '30.00',
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
          given_points: '30',
          approved: true,
          base_points: '30.00',
        },
      ],
    },
    4: {
      pk: 4,
      required: false,
      answer_type: 'b',
      answer_required: false,
      evaluation_lines: [
        {
          min_value: '1.00',
          given_points: '40',
          approved: true,
          base_points: '40.00',
        },
      ],
    },
  },
}

describe('Module.getBasePoints', function () {
  it('returns 32 example with guidelines with answer_required = false and surveyPrefix = Evaluación', function () {
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
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3, 4],
        required_points: 50,
        module_type: 'g',
        sum_only_if_approved: true,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete, true)

    expect(moduleItem.getBasePoints()).toBe(32)
  })

  it('returns 102 example with guidelines with answer_required = false and surveyPrefix = Pre-evaluacion', function () {
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
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3, 4],
        required_points: 50,
        module_type: 'g',
        sum_only_if_approved: true,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete, false)

    expect(moduleItem.getBasePoints()).toBe(102)
  })
})

describe('Module.getGivenPoints', function () {
  it('returns 0 example module not approved and sum_only_if_approved = true', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
      },
      2: {
        guideline_pk: 2,
        value: '0',
      },
      3: {
        guideline_pk: 3,
        value: '0',
      },
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3],
        required_points: 60,
        module_type: 'g',
        sum_only_if_approved: true,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete)

    expect(moduleItem.getGivenPoints()).toBe(0)
  })

  it('returns 2 example module not approved and sum_only_if_approved = false', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
      },
      2: {
        guideline_pk: 2,
        value: '0',
      },
      3: {
        guideline_pk: 3,
        value: '0',
      },
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3],
        required_points: 50,
        module_type: 'g',
        sum_only_if_approved: false,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete)

    expect(moduleItem.getGivenPoints()).toBe(2)
  })
})

describe('Module.isApproved', function () {
  it('returns false if guideline required = true not approved', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '0',
      },
      2: {
        guideline_pk: 2,
        value: '1.00',
      },
      3: {
        guideline_pk: 3,
        value: '1.00',
      },
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3],
        required_points: 50,
        module_type: 'g',
        sum_only_if_approved: false,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete)

    expect(moduleItem.isApproved()).toBe(false)
  })

  it('returns false if required_points not reached', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
      },
      2: {
        guideline_pk: 2,
        value: '0',
      },
      3: {
        guideline_pk: 3,
        value: '0',
      },
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3],
        required_points: 60,
        module_type: 'g',
        sum_only_if_approved: false,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete)

    expect(moduleItem.isApproved()).toBe(false)
  })

  it('returns true if required_points is reached and all guidelines with required = true are approved', function () {
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
        value: '0',
      },
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3],
        required_points: 50,
        module_type: 'g',
        sum_only_if_approved: false,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete)

    expect(moduleItem.isApproved()).toBe(true)
  })

  it('when given points are close enough (69,5%<=) returns true', function () {
    const answers = {
      1: {
        guideline_pk: 1,
        value: '1.00',
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
        guideline_pk: 3,
        value: '1.00',
      },
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3, 4],
        required_points: 70,
        module_type: 'g',
        sum_only_if_approved: false,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete)

    expect(moduleItem.isApproved()).toBe(true)
  })

  it('when given points is not close enough (69,5%>) returns false', function () {
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
        value: '0',
      },
      4: {
        guideline_pk: 3,
        value: '0',
      },
    }

    audit_program.modules = {
      10: {
        guideline_pks: [1, 2, 3, 4],
        required_points: 70,
        module_type: 'g',
        sum_only_if_approved: false,
      },
    }

    const guidelines = StatisticsHelpers.getGuidelinesArray(
      audit_program.guidelines,
      audit_program.modules[10].guideline_pks
    )

    const answersComplete = StatisticsHelpers.generateAnswers(
      answers,
      audit_program.modules[10].guideline_pks
    )

    const moduleItem = new Module(audit_program.modules[10], guidelines, answersComplete)

    expect(moduleItem.isApproved()).toBe(false)
  })
})
