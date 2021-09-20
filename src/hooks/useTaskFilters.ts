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
  tasksToShowGrouped: TasksGroupedByStatus
}

const useTaskFilters = (tasks: Task[]): TasksFilters => {
  const [tasksToShow, setTasksToShow] = useState(tasks)
  const [statusFilters, setStatusFilters] = useState<TypeTaskStatus[]>([])
  const [guidelineNameFilter, setGuidelineNameFilter] = useState('')

  useEffect(() => {
    setTasksToShow(tasks)
  }, [tasks.length])

  const onApplyFilters = (statusFilters: TypeTaskStatus[]): void => {
    const filters: any = {
      [TaskStatus.new]: (task: Task): boolean => task.status === '0',
      [TaskStatus.pending]: (task: Task): boolean => task.status === '1' && !isTaskExpired(task),
      [TaskStatus.expired]: (task: Task): boolean => task.status === '1' && isTaskExpired(task),
      [TaskStatus.done]: (task: Task): boolean => task.status === '2',
      guidelineNameFilter: (task: Task): boolean =>
        task.guidelineName.includes(guidelineNameFilter),
    }
    const filtersToApply: any[] = []
    statusFilters.forEach((status) => {
      filtersToApply.push(filters[status as any])
    })
    if (guidelineNameFilter) {
      filtersToApply.push(filters['guidelineNameFilter'])
    }
    debugger
    console.log('filtersToApply', filtersToApply)

    setTasksToShow(tasks.filter((item) => filtersToApply.every((filter) => filter(item))))
  }

  const addFilterStatus = (status: TypeTaskStatus): void => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => !(s === status)))
      onApplyFilters(statusFilters.filter((s) => !(s === status)))
    } else {
      setStatusFilters([...statusFilters, status])
      onApplyFilters([...statusFilters, status])
    }
  }

  const addGuidelineNameFilter = (name: string): void => {
    setGuidelineNameFilter(name)
    //onApplyFilters('test')
  }
  const tasksToShowGrouped = getTaskByStatus(tasksToShow)
  return {
    statusFilters,
    addFilterStatus,
    guidelineNameFilter,
    addGuidelineNameFilter,
    tasksToShowGrouped,
  }
}

export default useTaskFilters
