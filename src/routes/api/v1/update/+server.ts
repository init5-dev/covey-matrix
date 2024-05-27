import prisma from "$lib/prisma"

export const PUT = async ({request}) => {
  const data = await request.json()

  if (!data) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Bad Request'
    }))
  }

  try {
    await prisma.$connect()

    const response = await prisma.task.update({
      where: {
        id: data.id
      },
      data
    })

    await prisma.$disconnect()

    return new Response(JSON.stringify({
      success: true,
      task: response
    }))
  } catch (err) {
    await prisma.$disconnect()
    
    const error = err as Error

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }))
  }
}