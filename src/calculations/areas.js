import Module from './modules'
import Guideline from './guidelines'
import StatisticsHelpers from './statisticsHelpers'

// Area de un programa de auditoria
export default class Area {
  constructor(areaData, guidelines, answers, modules, isAudit) {
    this.isAudit = isAudit
    this.modules = modules
    this.guidelines = guidelines
    this.answers = answers
    this.required_points = areaData ? areaData.required_points : 0
    this.essential = areaData ? areaData.essential : false
    this.sum_only_if_approved = areaData
      ? areaData.sum_only_if_approved
        ? areaData.sum_only_if_approved
        : false
      : false
  }

  countApprovedGuidelines() {
    let guideline_pks
    if (this.isAudit) {
      guideline_pks = Object.values(this.guidelines)
        .filter((guideline) => guideline.answer_required)
        .map((guideline) => guideline.pk)
    } else {
      guideline_pks = Object.keys(this.guidelines)
    }

    const answersComplete = StatisticsHelpers.generateAnswers(this.answers, guideline_pks)

    const guidelines = StatisticsHelpers.getGuidelinesObject(this.guidelines, guideline_pks)

    let numberUnapprovedGuidelines = 0
    for (let i = 0; i < guideline_pks.length; i++) {
      const guideline = new Guideline(
        guidelines[guideline_pks[i]],
        answersComplete[guidelines[guideline_pks[i]].pk],
        this.isAudit
      )

      if (guideline.isApproved()) {
        numberUnapprovedGuidelines = numberUnapprovedGuidelines + 1
      }
    }

    return numberUnapprovedGuidelines
  }

  getNumberRequiredGuidelines() {
    const requiredGuidelines = Object.values(this.guidelines).filter(
      (guideline) => guideline.required
    )
    return requiredGuidelines.length
  }

  getNumberUnapprovedRequiredGuidelines() {
    let arrayRequiredGuidelinesApprovedStatus = []

    const requiredGuidelines = Object.values(this.guidelines).filter(
      (guideline) => guideline.required
    )

    for (let i = 0; i < requiredGuidelines.length; i++) {
      const guideline = new Guideline(
        requiredGuidelines[i],
        this.answers[requiredGuidelines[i].pk],
        this.isAudit
      )

      arrayRequiredGuidelinesApprovedStatus.push(guideline.isApproved())
    }

    return arrayRequiredGuidelinesApprovedStatus.filter((v) => !v).length
  }

  getModulesApprovedStatus() {
    let arrayModulesApprovedStatus = []

    for (let i = 0; i < this.modules.length; i++) {
      const guidelines = StatisticsHelpers.getGuidelinesArray(
        this.guidelines,
        this.modules[i].guideline_pks
      )

      const answersComplete = StatisticsHelpers.generateAnswers(
        this.answers,
        this.modules[i].guideline_pks
      )

      const moduleItem = new Module(this.modules[i], guidelines, answersComplete, this.isAudit)

      arrayModulesApprovedStatus.push({
        module_pk: this.modules[i].pk,
        approved: moduleItem.isApproved(),
      })
    }

    return arrayModulesApprovedStatus
  }

  getRequiredGuidelinesApprovedStatus() {
    let arrayRequiredGuidelinesApprovedStatus = []

    const requiredGuidelines = Object.values(this.guidelines).filter(
      (guideline) => guideline.required
    )

    for (let i = 0; i < requiredGuidelines.length; i++) {
      const guideline = new Guideline(
        requiredGuidelines[i],
        this.answers[requiredGuidelines[i].pk],
        this.isAudit
      )

      arrayRequiredGuidelinesApprovedStatus.push({
        guideline_pk: requiredGuidelines[i].pk,
        approved: guideline.isApproved(),
      })
    }

    return arrayRequiredGuidelinesApprovedStatus
  }

  isEssential() {
    return true
  }

  isTypeSumOnlyIfApproved() {
    return this.sum_only_if_approved
  }

  getGivenPointsByitSelfOnlyModulesTypeG() {
    let points = 0
    const modules = this.modules.filter((module) => module.module_type === 'g')

    for (let i = 0; i < modules.length; i++) {
      const guidelines = StatisticsHelpers.getGuidelinesArray(
        this.guidelines,
        modules[i].guideline_pks
      )

      const answersComplete = StatisticsHelpers.generateAnswers(
        this.answers,
        modules[i].guideline_pks
      )

      const moduleItem = new Module(modules[i], guidelines, answersComplete, this.isAudit)

      points = moduleItem.getGivenPoints() + points
    }

    return points
  }

  getGivenPointsOnlyModulesTypeG() {
    let points = 0

    if (this.sum_only_if_approved) {
      //we have to check if area is approved
      if (this.isApproved()) {
        points = this.getGivenPointsByitSelfOnlyModulesTypeG()
      } else {
        return 0
      }
    } else {
      points = this.getGivenPointsByitSelfOnlyModulesTypeG()
    }

    return points
  }

  getGivenPointsByitSelf() {
    let points = 0

    for (let i = 0; i < this.modules.length; i++) {
      const guidelines = StatisticsHelpers.getGuidelinesArray(
        this.guidelines,
        this.modules[i].guideline_pks
      )

      const answersComplete = StatisticsHelpers.generateAnswers(
        this.answers,
        this.modules[i].guideline_pks
      )

      const moduleItem = new Module(this.modules[i], guidelines, answersComplete, this.isAudit)

      points = moduleItem.getGivenPoints() + points
    }

    return points
  }

  getGivenPoints() {
    let points = 0

    if (this.sum_only_if_approved) {
      //we have to check if area is approved
      if (this.isApproved()) {
        points = this.getGivenPointsByitSelf()
      } else {
        return 0
      }
    } else {
      points = this.getGivenPointsByitSelf()
    }

    return points
  }

  isApproved() {
    //To consider an area as approved we need the same basic things than modules: al required guidelines approved
    //and to reach the required_points

    //Are all required guidelines approved?
    const requiredGuidelines = Object.values(this.guidelines).filter(
      (guideline) => guideline.required
    )

    let requiredGuidelinesApproved = true

    for (let i = 0; i < requiredGuidelines.length; i++) {
      const guideline = new Guideline(
        requiredGuidelines[i],
        this.answers[requiredGuidelines[i].pk],
        this.isAudit
      )
      if (!guideline.isApproved()) {
        requiredGuidelinesApproved = false
        break
      }
    }

    //Did we reach the minimum amount of points?
    let requiredPointsReached = true
    if (this.required_points > 0) {
      const pointsModule = this.getGuidelinesGivenPoints()
      const basePointsModule = this.getBasePoints()
      requiredPointsReached =
        this.required_points <= Math.round((pointsModule / basePointsModule) * 100)
    }

    return requiredGuidelinesApproved && requiredPointsReached
  }

  getGuidelinesGivenPoints() {
    let totalPoints = 0

    for (let i = 0; i < Object.values(this.guidelines).length; i++) {
      const guideline = new Guideline(
        Object.values(this.guidelines)[i],
        this.answers[Object.values(this.guidelines)[i].pk],
        this.isAudit
      )
      totalPoints = guideline.getGivenPoints() + totalPoints
    }

    return totalPoints
  }

  getPointsPercent() {
    if (this.getGivenPointsByitSelf() === 0 && this.getBasePoints() === 0) {
      return 0
    } else {
      return Math.round((this.getGivenPointsByitSelf() / this.getBasePoints()) * 100)
    }
  }

  getBasePoints() {
    let basePoints = 0

    for (let i = 0; i < this.modules.length; i++) {
      const guidelines = StatisticsHelpers.getGuidelinesArray(
        this.guidelines,
        this.modules[i].guideline_pks
      )

      const answersComplete = StatisticsHelpers.generateAnswers(
        this.answers,
        this.modules[i].guideline_pks
      )

      const moduleItem = new Module(this.modules[i], guidelines, answersComplete, this.isAudit)

      basePoints = moduleItem.getBasePoints() + basePoints
    }

    return basePoints
  }

  getBasePointsOnlyModulesTypeG() {
    let basePoints = 0

    const moduleTypeG = this.modules.filter((module) => module.module_type === 'g')

    for (let i = 0; i < moduleTypeG.length; i++) {
      const guidelines = StatisticsHelpers.getGuidelinesArray(
        this.guidelines,
        moduleTypeG[i].guideline_pks
      )

      const answersComplete = StatisticsHelpers.generateAnswers(
        this.answers,
        moduleTypeG[i].guideline_pks
      )

      const moduleItem = new Module(moduleTypeG[i], guidelines, answersComplete, this.isAudit)

      basePoints = moduleItem.getBasePoints() + basePoints
    }

    return basePoints
  }
}
