import type { ITask } from "$lib/components/Matrix/types"
import { PrismaClient } from "@prisma/client"

export const load = async () => {
  const prisma = new PrismaClient()

  try {
    const tasks: ITask[] = await prisma.task.findMany()

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