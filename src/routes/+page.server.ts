import type { ITask, TRelevance } from "$lib/types"
import { PrismaClient } from "@prisma/client"

export const load = async () => {
  const prisma = new PrismaClient()

  try {
    const tasks: ITask[] = (await prisma.task.findMany()).map(task => ({
      ...task,
      important: task.important as TRelevance,
      urgent: task.urgent as TRelevance
    }))

    return {
      success: true,
      tasks
    }
  } catch (err) {
    const error = err as Error

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }))
  }
}