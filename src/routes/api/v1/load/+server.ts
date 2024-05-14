import type { ITask, TRelevance } from "$lib/types"
import { Prisma, PrismaClient } from "@prisma/client"

export const GET = async () => {
  const prisma = new PrismaClient()

  try {
    const tasks: ITask[] = (await prisma.task.findMany()).map(task => ({
        ...task,
        important: task.important as TRelevance,
        urgent: task.urgent as TRelevance
    }))

    return new Response(JSON.stringify({
      success: true,
      tasks
    }))
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const error = err as Prisma.PrismaClientKnownRequestError

      if (error.code === 'P2002') {
        return new Response(JSON.stringify({
          success: false,
          error: 'The task already exists'
        }))
      }
    }

    const error = err as Error

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }))
  }
}