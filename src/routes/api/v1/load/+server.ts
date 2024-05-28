import prisma from "$lib/prisma"

export const GET = async () => {
  try {
    await prisma.$connect()

    const tasks = await prisma.task.findMany({})
 
    await prisma.$disconnect()

    return new Response(JSON.stringify({
      success: true,
      tasks
    }))
  } catch (err) {
    try {
      await prisma.$disconnect()
    } catch (error) {
      console.error((error as Error).message)
    }
    
    const error = err as Error

    console.error(error.message)

    return new Response(JSON.stringify({
      success: false,
      error: 'Load failed!'
    }))
  }
}