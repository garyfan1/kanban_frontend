import { api } from "@/services/api"

export interface TaskApi {
  id: number
  user: number
  created_at: string
  updated_at: string
  title: string
  description: string
  status: "todo" | "doing" | "done"
}

export type TaskCreateApiType = Pick<TaskApi, "title" | "description" | "status">

export const taskService = {
  listTasks: async (): Promise<TaskApi[]> => {
    const resp = await api.get("tasks/")
    return resp.data
  },
  getTaskById: async (id: number): Promise<TaskApi> => {
    const resp = await api.get(`tasks/${id.toString()}/`)
    return resp.data
  },
  createTask: async (body: TaskCreateApiType): Promise<TaskApi> => {
    const resp = await api.post(`tasks/`, body)
    return resp.data
  },
  patchTask: async (body: { id: number; data: Partial<TaskCreateApiType> }): Promise<TaskApi> => {
    const resp = await api.patch(`tasks/${body.id.toString()}/`, body.data)
    return resp.data
  },
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`tasks/${id.toString()}/`)
  },
}
