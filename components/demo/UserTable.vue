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
    >
      <el-table-column>
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </ElITable>
    <DemoUserEdit ref="editDialogRef" />
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";

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

const editDialogRef = ref<FormInstance>();

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

const handleEdit = (index: number, row: DemoUser) => {
  // @ts-ignore
  editDialogRef.value?.openDialog(row);
};

function handleDelete(index: number, row: DemoUser) {}
</script>

<style></style>
