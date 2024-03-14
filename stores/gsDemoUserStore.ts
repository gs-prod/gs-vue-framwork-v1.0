import { defineStore } from "pinia";

export const useGsDemoUserStore = defineStore("gsDemoUserStore", {
  state: () => ({
    demoUsers: [] as DemoUser[],
    totalElements: 0,
    pageNumber: 1,
    pageSize: 20,
    params: {
      userName: "",
      email: "",
      mobile: "",
    },
  }),

  actions: {
    async getDemoUsers(params?: {
      userName: string;
      email: string;
      mobile: string;
    }) {
      if (params !== undefined) this.params = params;
      const {
        data: result,
        pending,
        error,
        status,
      } = await useQsRequest.get("/api/user", {
        ...this.params,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
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
