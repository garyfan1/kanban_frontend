import router from "@/router";
import { authService } from "@/services/authServices";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("Auth", {
  state: () => {
    return {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  },
  getters: {
    isLoggedIn: (state): boolean => {
      return !!state.accessToken;
    },
  },
  actions: {
    async logIn({ username, password }: { username: string; password: string }) {
      const resp = await authService.signIn({ username: username, password: password });
      localStorage.setItem("accessToken", resp.access);
      localStorage.setItem("refreshToken", resp.refresh);
      this.accessToken = resp.access;
      this.refreshToken = resp.refresh;
    },
    async getProfile() {
      const resp = await authService.getProfile();
      return resp;
    },
    logout() {
      this.accessToken = "";
      this.refreshToken = "";
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
      router.push("/auth");
    },
    async refreshLogIn() {
      if (this.refreshToken) {
        const resp = await authService.refreshLogIn(this.refreshToken);
        localStorage.setItem("accessToken", resp.access);
        localStorage.setItem("refreshToken", resp.refresh);
        this.accessToken = resp.access;
        this.refreshToken = resp.refresh;
      } else {
        this.logout();
      }
    },
    async signUp(cred: { username: string; password: string }) {
      const resp = await authService.signUp(cred);
      return resp;
    },
  },
});
