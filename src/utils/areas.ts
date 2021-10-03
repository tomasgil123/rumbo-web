import { AuditProgram } from 'types/auditProgram'

export interface areasNamesAndPks {
  name: string
  pk: number
}

export const getAreas = (auditProgram: AuditProgram): any => {
  const areas = Object.values(auditProgram.areas)

  const areasNamesAndPks = areas.map((area) => ({ name: area.name, pk: area.pk }))
  return areasNamesAndPks
}
