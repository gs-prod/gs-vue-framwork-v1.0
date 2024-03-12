<template>
  <div class="content_container">
    <div class="content_container-block">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// export default {
//   name: "ContentContainer",
// };
</script>

<style lang="scss" scoped>
.content_container {
  display: block;
  height: auto;
  // width: calc(100vw - 180px);
  // background: #eff2f6;
  padding: 10px 10px 0px 10px;
  padding-top: 10px;
  &-block {
    border-radius: 4px;
    width: 100%;
    background: #fff;
    padding: 10px 10px;
  }
}
</style>
