import { defineStore } from "pinia";

export const useGsDemoStore = defineStore("gsDemoStore", {
  state: () => ({ count: 1 }),

  getters: {
    doubleCount() : number {
      return this.count * 2;
    },
  },

  actions: {
    increment() {
      return ++this.count;
    },
  },

});
