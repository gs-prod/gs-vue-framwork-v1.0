<template>
  <div>
    <!-- <CommonTagsView title="DemoUser" /> -->
    <CommonContentContainer>
      <template #content>
        <DemoUserSearch ref="demoUserSearch" />
      </template>
    </CommonContentContainer>
    <CommonContentContainer>
      <template #content>
        <DemoUserBtnGroup ref="demoUserBtnGroup" />
      </template>
    </CommonContentContainer>
    <CommonContentContainer>
      <template #content>
        <DemoUserTable ref="demoUserTable" :search-form="{}" />
      </template>
    </CommonContentContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const data = reactive({});
</script>
