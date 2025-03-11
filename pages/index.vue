<template>
  <div class="login">
    <!-- 添加背景动画小球 -->
    <div class="floating-balls">
      <div class="ball ball-1"></div>
      <div class="ball ball-2"></div>
      <div class="ball ball-3"></div>
      <div class="ball ball-4"></div>
      <div class="ball ball-5"></div>
      <div class="ball ball-6"></div>
      <div class="ball ball-7"></div>
      <div class="ball ball-8"></div>
      <div class="ball ball-9"></div>
      <div class="ball ball-10"></div>
      <div class="ball ball-11"></div>
      <div class="ball ball-12"></div>
      <div class="ball ball-13"></div>
      <div class="ball ball-14"></div>
      <div class="ball ball-15"></div>
    </div>

    <el-form
      ref="loginFormRef"
      :model="data.loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="login-left">
        <div class="left-title">
          <p class="title_CN">青石数字化管理平台</p>
          <p class="title_EN">greenstone digital management platform</p>
        </div>
      </div>
      <div class="login-right">
        <h3 class="right-title">用户登录 <span>USER LOGIN</span></h3>
        <el-form-item prop="userName">
          <el-input
            v-model="data.loginForm.userName"
            type="text"
            auto-complete="off"
            placeholder="账号"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="data.loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="data.captchaEnabled" prop="code">
          <el-input
            v-model="data.loginForm.code"
            auto-complete="off"
            placeholder="验证码(尚未实装)"
            style="width: 63%"
          >
            <template #prefix>
              <el-icon><Picture /></el-icon>
            </template>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" class="login-code-img" @click="getCode" />
          </div>
        </el-form-item>
        <el-checkbox
          v-model="data.loginForm.rememberMe"
          style="margin: 0px 0px 25px 0px"
          >记住密码(尚未实装)</el-checkbox
        >
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
          <div v-if="register" style="float: right">
            <router-link class="link-type" :to="'/register'"
              >立即注册</router-link
            >
          </div>
        </el-form-item>
      </div>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2025 www.greenstone.co All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Picture } from "@element-plus/icons-vue";
import type { RouteLocationRaw } from "vue-router";
import type { FormInstance } from "element-plus";
definePageMeta({ auth: false, layout: "no-layout" });
const { signIn, status } = sideBaseUseAuth();

const data = reactive({
  loginForm: {
    userName: "",
    password: "",
    code: "",
    rememberMe: false,
  },
  captchaEnabled: true,
  loading: false,
});

const loginFormRef = ref<FormInstance>();

const loginRules = {
  userName: [{ required: true, trigger: "blur", message: "账号不能为空" }],
  password: [{ required: true, trigger: "blur", message: "密码不能为空" }],
};

const config = useRuntimeConfig();

onMounted(() => {
  if (status.value === "authenticated")
    navigateTo(
      config.public.LOGIN_CALLBACK_UR as RouteLocationRaw | null | undefined,
    );
});

const handleLogin = async (loginFormRef: FormInstance | undefined) => {
  if (!loginFormRef) return;
  await loginFormRef.validate(async (valid, fields) => {
    if (valid) {
      data.loading = true;
      try {
        await signIn(
          {
            userName: data.loginForm.userName,
            password: data.loginForm.password,
          },
          { callbackUrl: config.public.LOGIN_CALLBACK_URL },
        );
      } catch (error) {
        ElNotification({
          title: "Error",
          message: "登陆失败:" + error,
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

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #eceff4;
  position: relative;
  overflow: hidden;
}

// 添加浮动小球样式
.floating-balls {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

.ball {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  animation: float 15s infinite;
  width: 30px;
  height: 30px;
  &.ball-1 {
    background: #4f9efd;
    left: 10%;
    top: 20%;
    animation-delay: -2s;
  }

  &.ball-2 {
    background: #f17e62;
    right: 15%;
    top: 30%;
    animation-delay: -5s;
  }

  &.ball-3 {
    background: #fbc045;
    left: 28%;
    bottom: 43%;
    animation-delay: -7s;
  }

  &.ball-4 {
    width: 20px;
    height: 20px;
    background: #ffe58f;
    right: 10%;
    bottom: 23%;
    animation-delay: -9s;
  }

  &.ball-5 {
    background: #fbc045;
    left: 40%;
    top: 15%;
    animation-delay: -11s;
  }

  &.ball-6 {
    width: 20px;
    height: 20px;
    background: #7785a1;
    left: 40%;
    top: 55%;
    animation-delay: -9s;
  }

  &.ball-7 {
    background: #adc6ff;
    left: 70%;
    top: 15%;
    animation-delay: -10s;
  }

  &.ball-8 {
    background: #4f9efd;
    left: 20%;
    top: 85%;
    animation-delay: -9s;
  }

  &.ball-9 {
    background: #f17e62;
    left: 15%;
    top: 44%;
    animation-delay: -9s;
  }

  &.ball-10 {
    background: #adc6ff;
    left: 80%;
    top: 55%;
    animation-delay: -11s;
  }

  &.ball-11 {
    width: 20px;
    height: 20px;
    background: #7785a1;
    left: 10%;
    top: 85%;
    animation-delay: -11s;
  }

  &.ball-12 {
    background: #adc6ff;
    left: 90%;
    top: 15%;
    animation-delay: -6;
  }

  &.ball-13 {
    width: 20px;
    height: 20px;
    background: #4f9efd;
    left: 70%;
    top: 88%;
    animation-delay: -13;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-30px) translateX(20px);
  }
  50% {
    transform: translateY(20px) translateX(-20px);
  }
  75% {
    transform: translateY(30px) translateX(25px);
  }
}

// 修改登录表单样式，确保在小球上层显示
.login-form {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  width: 660px;
  padding: 0px 25px 0px 0px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .login-left {
    width: 330px;
    height: 460px;
    background: #ccc;
    background: inherit;
    background-color: rgba(64, 158, 255, 0.09803921568627451);
    background-image: url("@/public/login-left-image.png");
    background-repeat: no-repeat;
    background-size: 330px 335px;
    background-position: 0px 120px;
    border-radius: 8px 0 0 8px;

    .left-title {
      text-align: center;
      margin-top: 50px;

      .title_CN {
        font-size: 20px;
        font-weight: 700;
        color: #555555;
        margin: 0;
      }

      .title_EN {
        font-size: 10px;
        font-weight: 400;
        color: #999999;
        margin: 0;
      }
    }
  }

  .login-right {
    width: 300px;
    .right-title {
      font-size: 18px;
      font-weight: 700;
      color: #666;
      span {
        font-size: 14px;
        font-weight: 400;
        color: #999;
      }
    }
  }

  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #ccc;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
