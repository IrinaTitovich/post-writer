import { defineStore } from "pinia";
import { NewUser } from "../user";

interface UserState {
  currentUserId?: string;
}

export const useUsers = defineStore("users", {
  state(): UserState {
    return {
      currentUserId: undefined,
    };
  },

  actions: {
    async checkAutentification() {
      try {
        const response = await window.fetch("/api/current-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result: { id: string } = await response.json();
        this.currentUserId = await result.id;
      } catch {
        this.currentUserId = undefined;
      }
    },

    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);

      await window.fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      await this.checkAutentification();
    },

    async logout() {
      await window.fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      await this.checkAutentification();
    },

    async signIn(user: NewUser) {
      const body = JSON.stringify(user);

      const result = await window.fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      return result;
    },
  },
});
