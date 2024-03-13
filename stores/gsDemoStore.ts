import { defineStore } from "pinia";

export const useGsDemoStore = defineStore("gsDemoStore", {
  state: () => ({ count: 1, demoUsers: {} as DemoResp }),

  getters: {
    doubleCount(): number {
      return this.count * 2;
    },
  },

  actions: {
    increment() {
      return ++this.count;
    },

    async getDemoUsers() {
      const {
        data: result,
        pending,
        error,
        status,
      } = await useQsRequest.get("/api/user", {
        method: "get",
        params: { pageNumber: 1, pageSize: 50 },
      });

      this.demoUsers = result.value as DemoResp;
      // console.log("error");
      // console.log(typeof error.value);

      return this.demoUsers;
    },

    async getDemoUsersByDemoRequest() {
      const result = await useQsRequest.get("/api/user", {
        params: { pageNumber: 1, pageSize: 50 },
      });

      return this.demoUsers;
    },
  },
});
