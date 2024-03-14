<template>
  <div>
    <el-button type="success" plain @click="data.dialogFormVisible = true"
      >新增</el-button
    >
  </div>
  <el-dialog
    v-model="data.dialogFormVisible"
    title="Shipping address"
    width="500"
  >
    <el-form :model="data.form">
      <el-form-item label="Promotion name" :label-width="data.formLabelWidth">
        <el-input v-model="data.form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="data.formLabelWidth">
        <el-select
          v-model="data.form.region"
          placeholder="Please select a zone"
        >
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="data.dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="data.dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const data = reactive({
  dialogFormVisible: false,
  formLabelWidth: "140px",
  form: {
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: "",
  },
});
function addDemoUser(e: MouseEvent) {
  console.log("addDemoUser");
}
</script>
