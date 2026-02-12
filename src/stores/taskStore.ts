import { taskService, type TaskApi, type TaskCreateApiType } from "@/services/taskServices"
import { defineStore } from "pinia"

export const useTaskStore = defineStore("task", {
  state: () => {
    return {
      tasks: [] as TaskApi[],
    }
  },
  getters: {
    todoTasks: (state) => {
      return state.tasks.filter((t) => t.status === "todo")
    },
    doingTasks: (state) => {
      return state.tasks.filter((t) => t.status === "doing")
    },
    doneTasks: (state) => {
      return state.tasks.filter((t) => t.status === "done")
    },
  },
  actions: {
    async getTaskList() {
      const resp = await taskService.listTasks()
      this.tasks = resp
      return this.tasks
    },
    async getTaskById(id: number) {
      const resp = await taskService.getTaskById(id)
      return resp
    },
    async createTask(body: TaskCreateApiType) {
      const resp = await taskService.createTask(body)
      await this.getTaskList()
      return resp
    },
    async deleteTask(id: number) {
      await taskService.deleteTask(id)
      await this.getTaskList()
    },
  },
})
