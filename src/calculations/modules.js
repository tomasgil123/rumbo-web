import Guideline from './guidelines'

export default class Module {
  constructor(moduleData, guidelines, answers, isAudit) {
    this.isAudit = isAudit
    this.guideline_pks = moduleData.guideline_pks
    this.guidelines = guidelines
    this.answers = answers
    this.module_type = moduleData.module_type
    this.required_points = moduleData.required_points
    this.sum_only_if_approved = moduleData
      ? moduleData.sum_only_if_approved
        ? moduleData.sum_only_if_approved
        : false
      : false
  }

  // Devuelve la cantidad de puntos base
  getBasePoints() {
    let totalBasePoints = 0

    for (let i = 0; i < this.guidelines.length; i++) {
      const guideline = new Guideline(this.guidelines[i], {}, this.isAudit)
      totalBasePoints = guideline.getBasePoints() + totalBasePoints
    }

    return totalBasePoints
  }

  // Devuelve la cantidad de puntos obtenidos por el modulo
  getGivenPoints() {
    let points

    //We have to check which type of module is
    //modules of type sum_only_if_approved=true sum points only if they are approved
    if (this.sum_only_if_approved) {
      //we have to check if module is approved
      if (this.isApproved()) {
        points = this.getGuidelinesGivenPoints()
      } else {
        return 0
      }
    } else {
      points = this.getGuidelinesGivenPoints()
    }

    return points
  }

  //Devuelve la cantidad de puntos de todas las guidelines que componen el modulo
  getGuidelinesGivenPoints() {
    let totalPoints = 0

    for (let i = 0; i < this.guidelines.length; i++) {
      const guideline = new Guideline(
        this.guidelines[i],
        this.answers[this.guidelines[i].pk],
        this.isAudit
      )
      totalPoints = guideline.getGivenPoints() + totalPoints
    }

    return totalPoints
  }

  // Devuelve el porcentaje de puntos obtenidos
  getPointsPercent() {
    if (this.getBasePoints() === 0) {
      return 0
    }
    return (this.getGivenPoints() / this.getBasePoints()) * 100
  }

  // Devuelve true si el modulo tiene todos los lineamientos requeridos aprobados
  // y alcanza el porcentaje de puntos minimo
  isApproved() {
    //Are all required guidelines approved?
    const requiredGuidelines = this.guidelines.filter((guideline) => guideline.required)

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

  getGuidelinesApprovedStatus() {
    let arrayGuidelinesApprovedStatus = []

    for (let i = 0; i < this.guidelines.length; i++) {
      const guideline = new Guideline(
        this.guidelines[i],
        this.answers[this.guidelines[i].pk],
        this.isAudit
      )

      arrayGuidelinesApprovedStatus.push({
        guideline_pk: this.guidelines[i].pk,
        approved: guideline.isApproved(),
      })
    }

    return arrayGuidelinesApprovedStatus
  }
}
