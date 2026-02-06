import { api } from "@/services/api"

interface SignInResp {
  access: string
  refresh: string
}

export const authService = {
  signIn: async ({
    username,
    password,
  }: {
    username: string
    password: string
  }): Promise<SignInResp> => {
    const resp = await api.post("auth/login/token/", {
      username: username,
      password: password,
    })
    return resp.data
  },
}
