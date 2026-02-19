import { defineStore } from "pinia";

interface SnackbarState {
  isShown: boolean;
  message: string;
  color: "info" | "error" | "success";
}

export const useSnackbarStore = defineStore("snackbar", {
  state: (): SnackbarState => {
    return {
      isShown: false,
      message: "",
      color: "info",
    };
  },
  getters: {},
  actions: {
    showSnackbar(msg: string, type: "error" | "info" | "success" = "info") {
      this.message = msg;
      this.color = type;
      this.isShown = true;
    },
  },
});
