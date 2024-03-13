<template>
  <div>
    <ElITable
      :table-data="demoUserStore.demoUsers"
      :label-list="data.tableLabel"
      :table-loading="data.loading"
      :pagination="data.pagination"
      :selection="data.selection"
      table-max-height="70vh"
      table-height="70vh"
      @row-dblclick="goToDetail"
    />
  </div>
</template>

<script setup lang="ts">
// interface DemoUserTableProps {
//   searchForm: {};
// }

// const props = withDefaults(defineProps<DemoUserTableProps>(), {});

const data = reactive({
  tableLabel: [
    {
      prop: "id",
      label: "ID",
    },
    {
      prop: "userName",
      label: "userName",
    },
    {
      prop: "email",
      label: "email",
    },
    {
      prop: "mobile",
      label: "mobile",
    },
  ],
  loading: true,
  selection: false,
  pagination: false,
});

const demoUserStore = useGsDemoUserStore();

onMounted(async () => {
  await demoUserStore.getDemoUsers();
  data.loading = false;
});

// @ts-ignore
function goToDetail(row) {}
</script>

<style></style>
