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
    demoUserDetail: {} as DemoUser,
  }),

  actions: {
    async getDemoUsers(params?: {
      userName: string;
      email: string;
      mobile: string;
    }) {
      if (params !== undefined) this.params = params;
      const { data: result } = await useQsRequest.get("/api/user", {
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
      await useQsRequest.post("/api/user", {
        ...params,
      });
    },

    async getDemoUserDetail(id: number) {
      const { data } = await useQsRequest.get("/api/user/detail", {
        id,
      });
      this.demoUserDetail = (data as Ref<CommonResp<DemoUser>>).value.result;
    },

    async editDemoUser(params: {
      userName: string;
      email: string;
      mobile: string;
      password: string;
      confirmPassword: string;
    }) {
      await useQsRequest.put("/api/user", {
        ...params,
      });
    },

    async deleteDemoUser(id: number) {
      await useQsRequest.delete("/api/user", {
        id,
      });
    },
  },
});
