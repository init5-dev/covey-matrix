import type { ITask } from "$lib/types"

export const calculateImportance = (task: ITask) => {
  const weight = {
    financial: 4,
    spiritual: 3,
    social_emotional: 2,
    physical: 1
  }

  const {financial_importance, spiritual_importance, social_emotional_importance, physical_importance} = task
  
  const importance = 
    financial_importance * weight.financial +
    spiritual_importance * weight.spiritual +
    social_emotional_importance * weight.social_emotional + 
    physical_importance * weight.physical

  return importance
}

export const calculateUrgency = (task: ITask) => {
  const now = (new Date()).getTime()
  const timeDifference = new Date(task.deadline).getTime() - now
  let urgency

  if (timeDifference === 0) {
    urgency = Infinity
  } else if (timeDifference === Infinity || timeDifference < 0) {
    urgency = 0
  } else {
    urgency = 1 / timeDifference
  }

  return urgency
}