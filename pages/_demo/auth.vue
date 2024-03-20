<template>
  <div>
    <h1>Enter your credentials to continue</h1>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      status-icon
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="username">
        <el-input v-model="username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="password" type="text">
        <el-input v-model="password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signInWithCredentials()"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
definePageMeta({ auth: false, layout: "no-layout" });
const { signIn, status } = useAuth();

const username = ref("");
const password = ref("");

onMounted(() => {
  if (status.value === "authenticated") navigateTo("/demo/store");
});

const signInWithCredentials = async () => {
   // Probably you'll do some validation here before submitting to the backend
  // ...
  // This is the object that our backend expects for the `signIn` endpoint
  const credentials = {
    userName: username.value,
    password: password.value,
  };
  try {
    // This sends a POST request to the `auth.provider.endpoints.signIn` endpoint with `credentials` as the body
    await signIn(credentials, { callbackUrl: "/demo/store" });
    // navigateTo('/demo/store', { external: true })
  } catch (error) {
    console.error(error);
  } 
}
</script>
