import { defineStore } from "pinia";

export const useTagsViewStore = defineStore("tagsViewStore", {
  state: () => ({
    visitedViews: [] as ViewTag[],
    cachedViews: [] as string[],
  }),

  actions: {
    addView(params: ViewTag) {
      this.addVisitedView(params);
      this.addCachedView(params);
    },
    addVisitedView(params: ViewTag) {
      if (this.visitedViews.some((v) => v.router.path === params.router.path)) {
        // 如果路由已经存在则进行替换
        this.visitedViews.forEach((item, index) => {
          if (item.router.path === params.router.path) {
            this.visitedViews[index] = params;
          }
        });
      } else {
        this.visitedViews.push(params);
      }
    },
    addCachedView(view: ViewTag) {
      if (this.cachedViews.includes(view.router.name as string)) return;
      if (!view.router.meta?.noCache) {
        this.cachedViews.push(view.router.name as string);
      }
    },
    delView(view: ViewTag) {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delVisitedView(view: ViewTag) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.router.path === view.router.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: ViewTag) {
      return new Promise((resolve) => {
        for (const i of this.cachedViews) {
          if (i === view.router.name) {
            const index = this.cachedViews.indexOf(i);
            this.cachedViews.splice(index, 1);
            break;
          }
        }
        resolve([...this.cachedViews]);
      });
    },
    delOthersViews(view: ViewTag) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: ViewTag) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.router.path === view.router.path) {
            this.visitedViews = this.visitedViews.slice(i, i + 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    delOthersCachedViews(view: ViewTag) {
      return new Promise((resolve) => {
        for (const i of this.cachedViews) {
          if (i === view.router.name) {
            const index = this.cachedViews.indexOf(i);
            this.cachedViews = this.cachedViews.slice(index, index + 1);
            break;
          }
        }
        resolve([...this.cachedViews]);
      });
    },
    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        this.visitedViews = [];
        resolve([...this.visitedViews]);
      });
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    },
    updateVisitedView(view: ViewTag) {
      for (let v of this.visitedViews) {
        if (v.router.path === view.router.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});
