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
      prop: "deptName",
      label: "科室名称",
    },
    {
      prop: "personNum",
      label: "结算人次",
    },
    {
      prop: "unEffExpenses",
      label: "无效收入合计",
    },
    {
      prop: "aveUnEffExpenses",
      label: "人均无效收入",
    },
    {
      prop: "aveUnEffQuota",
      label: "人均无效收入定额",
    },
    {
      prop: "aveOverspend",
      label: "人均超支金额",
    },
    {
      prop: "overspendAmount",
      label: "扣款金额",
    },
  ],
  tableData: [],
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
