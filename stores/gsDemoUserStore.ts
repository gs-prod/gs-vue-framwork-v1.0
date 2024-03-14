import { defineStore } from "pinia";

export const useGsDemoUserStore = defineStore("gsDemoUserStore", {
  state: () => ({ demoUsers: [] as DemoUser[], totalElements: 0 }),

  actions: {
    async getDemoUsers(params?: {
      userName: string;
      email: string;
      mobile: string;
    }) {
      const {
        data: result,
        pending,
        error,
        status,
      } = await useQsRequest.get("/api/user", {
        ...params,
        pageNumber: 1,
        pageSize: 10,
      });

      this.demoUsers = (result as Ref<CommonListsResp>).value.result.content;
      this.totalElements = (
        result as Ref<CommonListsResp>
      ).value.result.totalElements;
    },

    async addDemoUser(params: {
      userName: string;
      email: string;
      mobile: string;
      password: string;
      confirmPassword: string;
    }) {
      const { data, pending, error, status } = await useQsRequest.post(
        "/api/user",
        {
          ...params,
        },
      );
    },
  },
});

interface DemoUser {
  id: number;
  userName: string;
  email: string;
  mobile: number;
}
