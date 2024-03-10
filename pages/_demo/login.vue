<template>
  <div class="login">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="userName">
        <el-input
          v-model="loginForm.userName"
          type="text"
          auto-complete="off"
          placeholder="账号"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin(loginFormRef)"
        />
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin(loginFormRef)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false, layout: "no-layout" });
import type { FormInstance } from "element-plus";
const { signIn, status } = useAuth();

const loading = ref(false);
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  userName: "",
  password: "",
});
const loginRules = {
  userName: [{ required: true, trigger: "blur", message: "账号不能为空" }],
  password: [{ required: true, trigger: "blur", message: "密码不能为空" }],
};

onMounted(() => {
  if (status.value === "authenticated") navigateTo("/_demo/store");
});

async function handleLogin(loginFormRef: FormInstance | undefined) {
  if (!loginFormRef) return;
  await loginFormRef.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      try {
        await signIn(
          {
            userName: loginForm.userName,
            password: loginForm.password,
          },
          { callbackUrl: "/_demo/user" },
        );
        // navigateTo('/demo/store', { external: true })
      } catch (error) {
        console.error(error);
        loading.value = false;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
}
</script>

<style lang="scss" scoped>
body {
  margin: 0px !important;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 365px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
</style>
