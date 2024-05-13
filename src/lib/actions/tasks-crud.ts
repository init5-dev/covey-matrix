import type { ITask } from "$lib/components/Matrix/types"


export const create = async () => {
   
}

export const load = async () => {

  
  const tasks: ITask[] = await prisma.task.findMany()

  return tasks
}