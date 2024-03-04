import { defineStore } from "pinia";

export const useGsDemoStore = defineStore("gsDemoStore", () => {
  let count = ref(1);
  const doubleCount = computed(() => count.value * 3);
  function increment() {
    return ++count.value;
  }

  return { count, doubleCount, increment };
});
