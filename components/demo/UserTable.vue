<template>
  <div>
    <ElITable
      :table-data="demoUserStore.demoUsers"
      :total="demoUserStore.totalElements"
      :current-page="demoUserStore.pageNumber"
      :page-size="demoUserStore.pageSize"
      :label-list="data.tableLabel"
      :table-loading="data.loading"
      :pagination="data.pagination"
      :selection="data.selection"
      table-max-height="70vh"
      table-height="70vh"
      @row-dblclick="goToDetail"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
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
  pagination: true,
});

const demoUserStore = useGsDemoUserStore();

onMounted(async () => {
  await demoUserStore.getDemoUsers();
  data.loading = false;
});

// @ts-ignore
function goToDetail(row) {}

function handleCurrentChange(value: number) {
  demoUserStore.pageNumber = value;
  demoUserStore.getDemoUsers();
}
</script>

<style></style>
