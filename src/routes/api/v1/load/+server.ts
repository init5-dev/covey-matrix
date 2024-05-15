import { Prisma } from "@prisma/client"
import prisma from "$lib/prisma"

export const GET = async () => {
  try {
    await prisma.$connect()

    const tasks = await prisma.task.findMany({})

    await prisma.$disconnect()

    console.log(tasks.reduce((accum, task) => accum += `I: ${task.important}; U: ${task.urgent}; H: ${task.hours}\n`, ''))

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