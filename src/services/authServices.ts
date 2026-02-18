import { api } from "@/services/api";
import axios from "axios";

interface SignInResp {
  access: string;
  refresh: string;
}

export const authService = {
  signIn: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<SignInResp> => {
    const resp = await api.post("token/", {
      username: username,
      password: password,
    });
    return resp.data;
  },
  getProfile: async (): Promise<{ username: string }> => {
    const resp = await api.get("profile/");
    return resp.data;
  },
  refreshLogIn: async (refreshToken: string): Promise<SignInResp> => {
    // to bypass interceptor use axios instead of api
    const resp = await axios.post("http://localhost:8000/api/token/refresh/", {
      refresh: refreshToken,
    });
    return resp.data;
  },
  signUp: async (cred: {
    username: string;
    password: string;
  }): Promise<{ id: string; username: string }> => {
    const resp = await api.post("register/", cred);
    return resp.data;
  },
};
