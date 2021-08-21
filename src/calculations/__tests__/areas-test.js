import Area from '../areas'
import StatisticsHelpers from '../statisticsHelpers'

const audit_program = {
  modules: {
    10: {
      guideline_pks: [1, 2],
      required_points: 50,
      module_type: 'g',
      sum_only_if_approved: false,
    },
    11: {
      guideline_pks: [3, 4, 5],
      required_points: 50,
      module_type: 'g',
      sum_only_if_approved: false,
    },
  },
  guidelines: {
    1: {
      pk: 1,
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
          given_points: '35',
          approved: true,
          base_points: '35.00',
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
          given_points: '35',
          approved: true,
          base_points: '35.00',
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
          given_points: '30',
          approved: true,
          base_points: '30.00',
        },
      ],
    },
  },
}

describe('Area.getBasePoints', function () {
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

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 50,
        sum_only_if_approved: true,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((moduleItem) => moduleItem.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules,
      false
    )

    expect(areaItem.getBasePoints()).toBe(5)
  })

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

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 50,
        sum_only_if_approved: true,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((moduleItem) => moduleItem.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules,
      true
    )

    expect(areaItem.getBasePoints()).toBe(4)
  })
})

describe('Area.getGivenPoints', function () {
  it('returns 0 if sum_only_if_approved = true and area is not approved', function () {
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
      4: {
        guideline_pk: 4,
        value: '0',
      },
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 50,
        sum_only_if_approved: true,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.getGivenPoints()).toBe(0)
  })

  it('returns 5 if sum_only_if_approved = true and area is approved', function () {
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
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 50,
        sum_only_if_approved: true,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.getGivenPoints()).toBe(5)
  })

  it('returns 1 if sum_only_if_approved = false and area is not approved', function () {
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
      4: {
        guideline_pk: 4,
        value: '0',
      },
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 50,
        sum_only_if_approved: false,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.getGivenPoints()).toBe(1)
  })
})

describe('Area.isApproved', function () {
  it('return false if not all guidelies with required = true are approved', function () {
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
        value: '0',
      },
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 50,
        sum_only_if_approved: false,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.isApproved()).toBe(false)
  })

  it('return false if required_points is not reached', function () {
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
      4: {
        guideline_pk: 4,
        value: '1.00',
      },
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 60,
        sum_only_if_approved: false,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.isApproved()).toBe(false)
  })

  it('returns true if required_points are reached and all required = true guidelines are approved', function () {
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
      4: {
        guideline_pk: 4,
        value: '1.00',
      },
      5: {
        guideline_pk: 5,
        value: '1.00',
      },
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 60,
        sum_only_if_approved: false,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.isApproved()).toBe(true)
  })

  it('when given points are close enough (69,5%<=) returns true', function () {
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
        value: '0',
      },
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 70,
        sum_only_if_approved: false,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.isApproved()).toBe(true)
  })

  it('when given points is not close enough (69,5%>) returns false', function () {
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
        guideline_pk: 4,
        value: '1.00',
      },
      5: {
        guideline_pk: 5,
        value: '0',
      },
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 80,
        sum_only_if_approved: false,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.isApproved()).toBe(false)
  })
})

describe('Area.countApprovedGuidelines', function () {
  it('return 3', function () {
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
        value: '0',
      },
    }

    audit_program.areas = {
      20: {
        module_pks: [10, 11],
        required_points: 50,
        sum_only_if_approved: false,
      },
    }

    const modules = StatisticsHelpers.getModules(
      audit_program.modules,
      audit_program.areas[20].module_pks
    )
    const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

    const answersComplete = StatisticsHelpers.generateAnswers(answers, module_guideline_pks)

    const areaItem = new Area(
      audit_program.areas[20],
      audit_program.guidelines,
      answersComplete,
      modules
    )

    expect(areaItem.countApprovedGuidelines()).toBe(3)
  })
})
