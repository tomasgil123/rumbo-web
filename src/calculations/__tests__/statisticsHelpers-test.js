import StatisticsHelpers from '../statisticsHelpers'

describe('helpers', function () {
  it('returns correct array of answers', () => {
    const answers = {
      1: {
        survey: 710,
        guideline_pk: 1,
        value: '1.00',
        edited: false,
        approved: true,
        sent_by: 'distriy3',
      },
      2: {
        survey: 710,
        guideline_pk: 2,
        value: '1.00',
        edited: false,
        approved: true,
        sent_by: 'distriy3',
      },
    }

    const guideline_pks = [1, 2, 3, 4]

    const answersComplete = StatisticsHelpers.generateAnswers(answers, guideline_pks)

    expect(Object.keys(answersComplete).sort()).toEqual(['1', '2', '3', '4'].sort())
  })

  it('returns correct array of guidelines', () => {
    const audit_program = {
      guidelines: {
        1: {
          pk: 1,
          code: 'ZM428',
          name: 'Relevamiento Mensual',
          description:
            'El Distribuidor RUMBO ejecuta todos los meses el Relevamiento Mensual del Proceso de Relevamiento de Censo',
          required: false,
          answer_type: 'b',
          answer_required: false,
          value_min: '0.00',
          value_max: '1.00',
          position: 110,
          approved: false,
          given_points: 0,
          attachments: [],
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
    const guideline_pks = [1]

    const guidelines = StatisticsHelpers.getGuidelinesArray(audit_program, guideline_pks)

    expect(guidelines.length).toBe(1)
  })
})
