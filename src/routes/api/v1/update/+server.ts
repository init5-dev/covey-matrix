import type { ITask, TRelevance } from "$lib/types"
import { PrismaClient } from "@prisma/client"

const isTask = (obj: object) => {
  try {
    const {id, description, urgent, important, hours} = obj as ITask

    if (typeof id !== 'number') return false
    if (typeof description !== 'string') return false
    if (typeof urgent !== 'number') return false
    if (typeof important !== 'number') return false
    if (typeof hours !== 'number') return false

    const relevanceValues = [0, 1, 2, 3]

    if (!relevanceValues.includes(urgent)) return false
    if (!relevanceValues.includes(important)) return false
  } catch (err) {
    return false
  }

  return true
}

export const PUT = async ({request}) => {
  const data = request.body

  if (!data || !isTask(data)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Bad Request'
    }))
  }

  const {id, description, urgent, important, hours} = Object(data) as ITask

  let updatedTask: ITask = {
    id,
    description,
    urgent,
    important,
    hours
  }

  const prisma = new PrismaClient()

  try {
    const response = await prisma.task.update({
      where: {
        id: updatedTask.id
      },
      data: updatedTask
    })
    
    updatedTask = {
      ...response,
      important: response.important as TRelevance,
      urgent: response.urgent as TRelevance
    }

    return new Response(JSON.stringify({
      success: true,
      task: updatedTask
    }))
  } catch (err) {
    const error = err as Error

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }))
  }
}