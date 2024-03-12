<template>
  <div class="header">
    <div class="left">
      <div style="width: 40px; height: 40px; margin-top: 12px">
        <img src="~/public/img/gear-2.png" alt="图片" width="100%" />
      </div>
      <div>
        <div class="leftText">青石管理平台</div>
        <div class="leftTextEnglish">Data acquisition platform</div>
      </div>
    </div>
    <div class="right">
      <div style="flex: 1"></div>
      <div
        v-show="data.isShow"
        class="pointer-cursor"
        style="display: flex; margin: 0px 10px"
        @click="$router.back()"
      >
        <div style="margin-top: 16px">
          <i class="el-icon-back back-icon" />
        </div>
        <div style="color: white; line-height: 65px; font-size: 14px">
          上一页
        </div>
      </div>
      <div
        class="pointer-cursor"
        style="display: flex; margin: 0px 10px"
        @click="goToHome"
      >
        <div style="margin-top: 16px">
          <img
            src="~/public/img/house-5.png"
            style="width: 30px; height: 30px; margin-right: 5px"
          />
        </div>
        <div class="top-right-corner-btn">首页</div>
      </div>
      <!-- <div style="display: flex; margin: 0px 10px"> -->
      <!-- <div style="margin-top: 15px">
          <img
            src="~/static/user.png"
            style="width: 30px; height: 30px; margin-right: 5px"
          />
        </div> -->
      <!-- <div style="color: white; line-height: 65px; font-size: 14px">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ user }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in userList" :key="index">
                {{ item.text }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
      <!-- </div> -->
      <div
        class="pointer-cursor"
        style="display: flex; margin: 0px 10px"
        @click="logout"
      >
        <div style="margin-top: 19px">
          <img
            src="~/public/img/arrow-door-out-3.png"
            style="width: 25px; height: 25px; margin-right: 5px"
          />
        </div>
        <div class="top-right-corner-btn">退出</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { signOut } = useAuth();

const data = reactive({
  user: "user",
  userList: [{ text: "userq", value: "1" }],
  isShow: false,
});

watch(route, (now, old) => {
  if (now.path === "/") {
    data.isShow = false;
  } else {
    data.isShow = true;
  }
});

function goToHome() {
  location.href = process.env.HOME_URL ?? "";
}

function logout() {
  ElMessageBox.confirm("是否退出登录状态?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await signOut({ callbackUrl: "/_demo/login" });
      ElNotification({
        title: "退出成功",
        type: "success",
      });
      // location.href = process.env.LOGIN_URL ?? "";
      // console.log(process.env.LOGIN_URL);
      // navigateTo(process.env.LOGIN_URL, { external: true });
    })
    .catch((err) => {
      console.log(err);
      ElNotification({
        title: "消息",
        message: "已取消退出登录",
      });
    });
}
</script>

<style lang="scss" scoped>
@import "~/assets/sass/global.scss";
.header {
  height: 65px;
  width: 100%;
  // background: #2f64b3;
  display: flex;
  padding: 0 10px;
  // border-bottom: 1px solid $color;
}
.left {
  flex: 1;
  display: flex;
}
.right {
  flex: 1;
  display: flex;
}
.leftText {
  color: $color;
  font-size: 16px;
  font-weight: 600;
  margin: 15px 5px 0px 5px;
}
.leftTextEnglish {
  color: #c7c7c7;
  font-size: 12px;
  margin: 0px 5px 0px 5px;
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.pointer-cursor {
  cursor: pointer;
}
.back-icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  font-size: 30px;
  color: #fff;
}
.top-right-corner-btn {
  color: $color;
  line-height: 65px;
  font-size: 14px;
}
</style>
