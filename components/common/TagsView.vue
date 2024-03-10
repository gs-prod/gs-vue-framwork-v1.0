<template>
  <div ref="root" class="tags-view-container">
    <ElScrollPane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.router.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{
          path: tag.router.path,
          query: tag.router.query,
        }"
        class="tags-view-item"
        @click.middle="closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </ElScrollPane>
    <!-- <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
// import type { RouteLocationNormalizedLoaded } from "#vue-router";
// import { nextTick } from "vue";

const visible = ref(false);
const top = ref(0);
const left = ref(0);
let selectedTag = reactive({});
const route = useRoute();

interface Props {
  title: string;
}

const props = withDefaults(defineProps<Props>(), { title: "msg-class" });

const tagsViewStore = useTagsViewStore();
const visitedViews = tagsViewStore.visitedViews;
const tag = ref();
const scrollPane = ref();
const root = ref(null);

onMounted(() => {
  addViewTags();
});

function isActive(visitedView: ViewTag) {
  return visitedView.router.path === route.path;
}

function addViewTags() {
  const { name } = route;
  if (name) {
    tagsViewStore.addView({ router: route, title: props.title });
  }
  return false;
}

// async function moveToCurrentTag() {
//   const tags = tag.value;
//   await nextTick();
//   for (const tag of tags) {
//     if (tag.to.path === route.path) {
//       scrollPane.value.moveToTarget(tag);
//       if (tag.to.fullPath !== route.fullPath) {
//         const param: ViewTag = {
//           router: route,
//           title: route.name as string,
//         };
//         tagsViewStore.updateVisitedView(param);
//       }
//       break;
//     }
//   }
// }

function closeSelectedTag(view: ViewTag) {
  tagsViewStore.delView(view).then((data) => {
    if (isActive(view.router)) {
      const latestView = (
        data as { visitedViews: ViewTag[]; cachedViews: string[] }
      ).visitedViews.slice(-1)[0];
      if (latestView) {
        navigateTo(latestView.router.path);
      } else {
        navigateTo("/");
      }
    }
  });
}

function openMenu(tag: ViewTag, e: MouseEvent) {
  const menuMinWidth = 105;
  // @ts-ignore
  const offsetLeft = root.value.getBoundingClientRect().left; // container margin left
  // @ts-ignore
  const offsetWidth = root.value.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const nowleft = e.clientX - offsetLeft + 15; // 15: margin right

  if (nowleft > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = nowleft;
  }
  top.value = e.clientY;

  visible.value = true;
  selectedTag = reactive(tag);
}

// function closeMenu() {
//   visible.value = false;
// }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #2f64b3;
        color: #fff;
        border-color: #2f64b3;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
