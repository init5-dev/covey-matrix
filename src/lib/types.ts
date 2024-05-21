export type TColor = 'important-urgent' | 'important-not-urgent' | 'not-important-urgent' | 'not-important-not-urgent' | 'none'

export type TRelevance = 0 | 1 | 2 | 3

export interface ITask {
  id: number
  description: string
  urgent: number
  important: number
}
