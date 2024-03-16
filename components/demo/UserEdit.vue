<template>
  <div>
    <el-dialog
      v-model="data.dialogFormVisible"
      title="Edit DemoUser"
      width="500"
    >
      <el-form ref="formRef" :model="data.form" :rules="formRules">
        <el-form-item
          label="userName"
          :label-width="data.formLabelWidth"
          prop="userName"
        >
          <el-input v-model="data.form.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="email"
          :label-width="data.formLabelWidth"
          prop="email"
        >
          <el-input v-model="data.form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="mobile"
          :label-width="data.formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="data.form.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="password"
          :label-width="data.formLabelWidth"
          prop="password"
        >
          <el-input v-model="data.form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="confirmPassword"
          :label-width="data.formLabelWidth"
          prop="confirmPassword"
        >
          <el-input v-model="data.form.confirmPassword" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">Cancel</el-button>
          <el-button type="primary" @click.prevent="editDemoUser(formRef)">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { resetForm } from "~/composables/resetForm";

const data = reactive({
  dialogFormVisible: false,
  formLabelWidth: "140px",
  form: {
    userName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  },
});

const formRules = {
  userName: [
    { required: true, trigger: "blur", message: "userName cannot be empty" },
  ],
  email: [
    { required: true, trigger: "blur", message: "email cannot be empty" },
  ],
  mobile: [
    { required: true, trigger: "blur", message: "mobile cannot be empty" },
  ],
  password: [
    { required: true, trigger: "blur", message: "password cannot be empty" },
  ],
  confirmPassword: [
    {
      required: true,
      trigger: "blur",
      message: "confirmPassword cannot be empty",
    },
  ],
};

const formRef = ref<FormInstance>();

const useGsDemoStore = useGsDemoUserStore();

const openDialog = async (row: DemoUser) => {
  await useGsDemoStore.getDemoUserDetail(row.id);
  copyProperties(useGsDemoStore.demoUserDetail, data.form);
  data.dialogFormVisible = true;
};

const closeDialog = () => {
  useGsDemoStore.getDemoUsers();
  data.dialogFormVisible = false;
  resetForm(data.form);
};

const editDemoUser = async (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  await formRef.validate(async (valid, fields) => {
    if (valid) {
      try {
        await useGsDemoStore.addDemoUser(data.form);
        ElNotification({
          title: "Success",
          message: "Save successfully",
          type: "success",
        });
        closeDialog();
      } catch (error) {
        console.log("exception occur:", error);
      }
    }
  });
};

defineExpose({
  openDialog,
});
</script>
