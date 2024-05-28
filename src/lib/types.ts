export type TColor = 'important-urgent' | 'important-not-urgent' | 'not-important-urgent' | 'not-important-not-urgent' | 'none'

export type TRelevance = 0 | 1 | 2 | 3

export type TStatus = 'pending' | 'in progress' | 'finished' | 'canceled'

export interface ITask {
  id: number
  description: string
  deadline: number
  financial_importance: number
  spiritual_importance: number
  social_emotional_importance: number
  physical_importance: number
  status: string
}

export interface IDeadline {
  name: string,
  value: number
}

export const Deadlines: IDeadline[] = [
  {
    name: 'today',
    value: 1
  },
  {
    name: 'tomorrow',
    value: 2
  },
  {
    name: 'this week',
    value: 7
  },
  {
    name: 'this fortnight',
    value: 15
  },
  {
    name: 'this month',
    value: 30
  },
  {
    name: 'this quarter',
    value: 90
  },
  {
    name: 'this semester',
    value: 180
  },
  {
    name: 'this year',
    value: 365
  },
  {
    name: 'indefinite',
    value: -1
  }
]
