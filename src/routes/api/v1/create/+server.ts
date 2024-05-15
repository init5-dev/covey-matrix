import { Prisma } from "@prisma/client"
import prisma from "$lib/prisma"

export const GET = async () => {
  const data = {
    description: '',
    important: 1,
    urgent: 1,
    hours: 0
  }

  try {

    await prisma.$connect()

    const task = await prisma.task.create({
      data
    })

    await prisma.$disconnect()

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