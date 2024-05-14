import type { ITask } from "$lib/types"


export const create = async () => {
   
}

export const load = async () => {

  
  const tasks: ITask[] = await prisma.task.findMany()

  return tasks
}