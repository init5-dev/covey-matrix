import prisma from "$lib/prisma"

export const DELETE = async ({request}) => {
  try {
    const {id} = await request.json()

    await prisma.$connect()

    const task = await prisma.task.delete({
      where: {
        id
      }
    })

    await prisma.$disconnect()

    return new Response(JSON.stringify({
      success: true,
      task
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
      error: 'Task deletion failed!'
    }))
  }
}