export type TColor = 'important-urgent' | 'important-not-urgent' | 'not-important-urgent' | 'not-important-not-urgent' | 'none'

export interface ITask {
  id: string
  description: string
  urgent: boolean
  important: boolean
  hours: number
}
