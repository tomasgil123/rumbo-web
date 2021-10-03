import { useState, useEffect } from 'react'
// utils
import { isTaskExpired, getTaskByStatus } from 'utils/tasks'
// types
import { TaskStatus, Task, TasksGroupedByStatus, TypeTaskStatus } from 'types/tasks'

interface TasksFilters {
  statusFilters: TypeTaskStatus[]
  addFilterStatus: (status: TypeTaskStatus) => void
  guidelineNameFilter: string
  addGuidelineNameFilter: (name: string) => void
  areaFilter: number
  addAreaFilter: (areaPk: number) => void
  tasksToShowGrouped: TasksGroupedByStatus
}

const useTaskFilters = (tasks: Task[]): TasksFilters => {
  const [tasksToShow, setTasksToShow] = useState(tasks)
  const [statusFilters, setStatusFilters] = useState<TypeTaskStatus[]>([])
  const [guidelineNameFilter, setGuidelineNameFilter] = useState('')
  const [areaFilter, setAreaFilter] = useState(0)

  useEffect(() => {
    // the first value of tasks we get is an empty array
    setTasksToShow(tasks)
  }, [tasks.length])

  // every time the user applies a filter this gets trigger
  const onApplyFilters = (
    statusFilters: TypeTaskStatus[],
    guidelineNameFilter: string,
    areaFilter: number
  ): void => {
    const filters: any = {
      [TaskStatus.new]: (task: Task): boolean => task.status === '0',
      [TaskStatus.pending]: (task: Task): boolean => task.status === '1' && !isTaskExpired(task),
      [TaskStatus.expired]: (task: Task): boolean => task.status === '1' && isTaskExpired(task),
      [TaskStatus.done]: (task: Task): boolean => task.status === '2',
      guidelineNameFilter: (task: Task): boolean =>
        task.guidelineName.toLowerCase().includes(guidelineNameFilter),
      areaFilter: (task: Task): boolean => task.areaPk === areaFilter,
    }
    const filtersToApply: any[] = []
    statusFilters.forEach((status) => {
      filtersToApply.push(filters[status as any])
    })
    if (guidelineNameFilter) {
      filtersToApply.push(filters['guidelineNameFilter'])
    }
    if (areaFilter) {
      filtersToApply.push(filters['areaFilter'])
    }
    setTasksToShow(tasks.filter((item) => filtersToApply.every((filter) => filter(item))))
  }

  const addFilterStatus = (status: TypeTaskStatus): void => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => !(s === status)))
      onApplyFilters(
        statusFilters.filter((s) => !(s === status)),
        guidelineNameFilter,
        areaFilter
      )
    } else {
      setStatusFilters([...statusFilters, status])
      onApplyFilters([...statusFilters, status], guidelineNameFilter, areaFilter)
    }
  }

  const addGuidelineNameFilter = (name: string): void => {
    setGuidelineNameFilter(name)
    onApplyFilters(statusFilters, name, areaFilter)
  }

  const addAreaFilter = (areaPk: number): void => {
    setAreaFilter(areaPk)
    onApplyFilters(statusFilters, guidelineNameFilter, areaPk)
  }
  // after we filter the tasks we grouped them
  const tasksToShowGrouped = getTaskByStatus(tasksToShow)

  return {
    addAreaFilter,
    areaFilter,
    statusFilters,
    addFilterStatus,
    guidelineNameFilter,
    addGuidelineNameFilter,
    tasksToShowGrouped,
  }
}

export default useTaskFilters
