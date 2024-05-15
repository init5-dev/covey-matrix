import prisma from "$lib/prisma"

const isTask = (obj: unknown) => {
  try {
    const {id, description, urgent, important, hours} = obj
    if (typeof id !== 'number') return false
    if (typeof description !== 'string') return false
    if (typeof urgent !== 'number') return false
    if (typeof important !== 'number') return false
    if (typeof hours !== 'number') return false

    const relevanceValues = [0, 1, 2, 3]

    if (!relevanceValues.includes(urgent)) return false
    if (!relevanceValues.includes(important)) return false
  } catch (err) {
    return false
  }

  return true
}

export const PUT = async ({request}) => {
  const data = await request.json()

  console.log('PUT')
  console.log('DATA:\n' + JSON.stringify(data, null, 2))

  if (!data || !isTask(data)) {
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
    const error = err as Error

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }))
  }
}