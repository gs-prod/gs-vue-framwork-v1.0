<template>
  <div>
    <CommonTagsView title="DemoUser" />
    <CommonContentContainer>
      <template #content>
        <DemoUserSearch ref="infoSearch" />
      </template>
    </CommonContentContainer>
    <CommonContentContainer>
      <template #content>
        <DemoUserTable ref="invalidTable" :search-form="{}" />
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
