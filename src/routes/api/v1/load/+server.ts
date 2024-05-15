import type { ITask, TRelevance } from "$lib/types"
import { Prisma } from "@prisma/client"
import prisma from "$lib/prisma"

export const GET = async () => {
  try {
    const tasks = await prisma.task.findMany()

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