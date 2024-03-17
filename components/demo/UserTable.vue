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

          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
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

const handleDelete = async (index: number, row: DemoUser) => {
  await demoUserStore.deleteDemoUser(row.id);
  demoUserStore.getDemoUsers();
};
</script>

<style></style>
