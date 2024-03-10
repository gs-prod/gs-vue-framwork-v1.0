<template>
  <div>
    <CommonTagsView title="DemoUser" />
    <CommonContentContainer>
      <template #content>
        <DemoUserSearch ref="infoSearch" />
      </template>
    </CommonContentContainer>
    <!-- <ContentContainer>
      <DepartmentInfoTable
        slot="content"
        ref="invalidTable"
        :search-form="searchForm"
      />
    </ContentContainer> -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const data = reactive({});
</script>
