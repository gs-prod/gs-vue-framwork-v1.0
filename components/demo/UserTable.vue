<template>
  <div>
    <ElITable
      :table-data="data.tableData"
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
interface DemoUserTableProps {
  searchForm: {};
}

const props = withDefaults(defineProps<DemoUserTableProps>(), {});

const data = reactive({
  tableLabel: [
    {
      prop: "id",
      label: "ID",
    },
    {
      prop: "name",
      label: "姓名",
    },
    {
      prop: "gender",
      label: "性别",
    },
  ],
  tableData: [
    {
      id: 1,
      name: "James Smith",
      gender: "male",
    },
    {
      id: 2,
      name: "Benjamin Johnson",
      gender: "male",
    },
    {
      id: 3,
      name: "Emily Williams",
      gender: "female",
    },
  ],
  loading: false,
  selection: false,
  pagination: false,
});

onMounted(() => {
  // console.log(123456);
});

// @ts-ignore
function goToDetail(row) {}
</script>

<style></style>
