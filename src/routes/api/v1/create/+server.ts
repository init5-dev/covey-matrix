import type { ITask, TRelevance } from "$lib/types"
import { Prisma, PrismaClient } from "@prisma/client"

export const GET = async () => {
  const data = {
    description: '',
    important: 1,
    urgent: 1,
    hours: 0
  }

  const prisma = new PrismaClient()

  try {
    const response = await prisma.task.create({
      data
    })
    
    const task: ITask = {
      ...response,
      important: response.important as TRelevance,
      urgent: response.urgent as TRelevance
    }

    return new Response(JSON.stringify({
      success: true,
      task
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