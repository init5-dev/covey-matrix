import type { ITask } from "$lib/types"

export const calculateRelevance = (task: ITask) => {
  const weight = {
    financial: 4,
    spiritual: 3,
    social_emotional: 2,
    physical: 1
  }

  const { financial_importance, spiritual_importance, social_emotional_importance, physical_importance } = task

  const importance =
    financial_importance * weight.financial +
    spiritual_importance * weight.spiritual +
    social_emotional_importance * weight.social_emotional +
    physical_importance * weight.physical

  return importance
}

export const calculateUrgency = (task: ITask) => {
  if (task.deadline < 0) return 0

  return 3 * (365 / task.deadline - 1) / 365
}