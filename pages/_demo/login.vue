<template>
  <div class="container">
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
        <el-form-item style="width: 100%; height: 300px">
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
      <div class="image">
        <img src="@/public/dongfangmingzhu.jpg" alt="Image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false, layout: "no-layout" });
import type { FormInstance } from "element-plus";
const { signIn, status } = sideBaseUseAuth();

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

const handleLogin = async (loginFormRef: FormInstance | undefined) => {
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
      } catch (error) {
        ElNotification({
          title: "Error",
          message: "请检查网络连接",
          type: "error",
        });
      } finally {
        loading.value = false;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped>
body {
  margin: 0px !important;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; //表示元素的高度将占据整个视口的高度。
  background-color: black;
}

.login {
  display: flex; //表示将元素的显示方式设置为弹性盒子布局。
  justify-content: center;
  align-items: center;
  //width: 900px;
  //height: 470px;
  height:380px;
  width:auto;
  border: 1px solid #93939b;
  background-color: #ffffff;
}

.image {
  display: flex;
  //justify-content: flex-end; //将子元素沿主轴朝容器的尾部对齐。
  justify-content: flex-start;//子元素将沿主轴起点对齐，也就是在主轴的起始位置上对齐。
  align-items: center;
  height: 380px;
  //width: 550px;
  width:auto;
  img {
    background-repeat: no-repeat;
    height: 380px;
    width: auto;
    //opacity: 0.4; //将元素的透明度设置为 0.4，也就是元素将显示为半透明状态。
  }
}

.login-form {
  background: #ffffff;
  height: 350px;
  width: auto;
  padding: 25px 25px 5px 25px;
  //border-radius: 0;//将元素的边框圆角设置为 0，即边框是直角的。

  .title {
    margin: 0px auto 15px auto;
    text-align: center;
    color: #707070;
  }

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
