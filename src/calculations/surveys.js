import Area from './areas'
import Module from './modules'
import Guideline from './guidelines'
import StatisticsHelpers from './statisticsHelpers'

export default class Survey {
  constructor(surveyData, guidelines, answers, areas, modules) {
    this.areas = areas
    this.modules = modules
    this.isAudit = surveyData.isAudit
    this.guidelines = guidelines
    this.answers = answers
  }

  countUnapprovedGuidelines() {
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

      if (!guideline.isApproved()) {
        numberUnapprovedGuidelines = numberUnapprovedGuidelines + 1
      }
    }

    return numberUnapprovedGuidelines
  }

  getGivenPoints() {
    let points = 0
    //If essential areas are not approved points of program equal 0

    if (this.areEssentialAreasApproved()) {
      for (let i = 0; i < this.areas.length; i++) {
        const modules = StatisticsHelpers.getModules(this.modules, this.areas[i].module_pks)

        const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

        const answersComplete = StatisticsHelpers.generateAnswers(
          this.answers,
          module_guideline_pks
        )

        const guidelines = StatisticsHelpers.getGuidelinesObject(
          this.guidelines,
          module_guideline_pks
        )

        const areaItem = new Area(this.areas[i], guidelines, answersComplete, modules, this.isAudit)

        if (this.isApproved()) {
          points = areaItem.getGivenPoints() + points
        } else {
          points = areaItem.getGivenPointsOnlyModulesTypeG() + points
        }
      }
    }

    return points
  }

  getPointsPercent() {
    return Math.floor((this.getGivenPoints() / this.getBasePoints()) * 100)
  }

  getBasePoints() {
    //solo utilizamos los modulos de tipo "g"
    let basePoints = 0

    const modulesTypeG = Object.values(this.modules).filter((module) => module.module_type === 'g')

    for (let i = 0; i < modulesTypeG.length; i++) {
      const guidelines = StatisticsHelpers.getGuidelinesArray(
        this.guidelines,
        modulesTypeG[i].guideline_pks
      )

      const answersComplete = StatisticsHelpers.generateAnswers(
        this.answers,
        modulesTypeG[i].guideline_pks
      )

      const moduleItem = new Module(modulesTypeG[i], guidelines, answersComplete, this.isAudit)

      basePoints = moduleItem.getBasePoints() + basePoints
    }

    return basePoints
  }

  //We consider a survey is approved if all modules of type "g" are approved
  isApproved() {
    let modulesTypeGAreApproved = true

    const moduleTypeG = Object.values(this.modules).filter((module) => module.module_type === 'g')

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

      if (!moduleItem.isApproved()) {
        modulesTypeGAreApproved = false
        break
      }
    }

    return modulesTypeGAreApproved
  }

  areEssentialAreasApproved() {
    let essentialAreasAreApproved = true

    const essentialAreas = this.areas.filter((area) => area.essential)

    for (let i = 0; i < essentialAreas.length; i++) {
      const modules = StatisticsHelpers.getModules(this.modules, essentialAreas[i].module_pks)

      const module_guideline_pks = modules.map((module) => module.guideline_pks).flat()

      const answersComplete = StatisticsHelpers.generateAnswers(this.answers, module_guideline_pks)

      const guidelines = StatisticsHelpers.getGuidelinesObject(
        this.guidelines,
        module_guideline_pks
      )

      const areaItem = new Area(
        essentialAreas[i],
        guidelines,
        answersComplete,
        modules,
        this.isAudit
      )

      if (areaItem.isEssential() && !areaItem.isApproved()) {
        essentialAreasAreApproved = false
        break
      }
    }

    return essentialAreasAreApproved
  }
}
