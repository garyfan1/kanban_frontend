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
    const resp = await api.post("token/", {
      username: username,
      password: password,
    })
    return resp.data
  },
  getProfile: async (): Promise<{ username: string }> => {
    const resp = await api.get("profile/")
    return resp.data
  },
}
