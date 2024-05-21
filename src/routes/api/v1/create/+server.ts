import { Prisma } from "@prisma/client"
import prisma from "$lib/prisma"

export const GET = async () => {
  try {

    await prisma.$connect()

    const index = (await prisma.task.count()) + 1

    const data = {
      description: `Task #${index}`,
      important: 1,
      urgent: 1,
    }

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
        try {
          await prisma.$disconnect()
        } catch (error) {
          console.error((error as Error).message)
        }
        
        return new Response(JSON.stringify({
          success: false,
          error: 'The task already exists'
        }))
      }
    }

    try {
      await prisma.$disconnect()
    } catch (error) {
      console.error((error as Error).message)
    }

    const error = err as Error

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }))
  }
}