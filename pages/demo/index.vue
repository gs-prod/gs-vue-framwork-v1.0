<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <h1>青石工作室</h1>
    <el-button @click="ElMessage('hello')">button</el-button>
    <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
    <LazyElButton type="warning">lazy button</LazyElButton>
  </div>
</template>
