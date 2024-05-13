import { load } from "$lib/actions/tasks-crud"
import type { ITask } from "$lib/components/Matrix/types"
import { Prisma, PrismaClient } from "@prisma/client"

export const GET = async () => {
  const data = {
    description: '',
    important: true,
    urgent: true,
    hours: 0
  }

  const prisma = new PrismaClient()

  try {
    const tasks: ITask[] = await prisma.task.findMany()

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