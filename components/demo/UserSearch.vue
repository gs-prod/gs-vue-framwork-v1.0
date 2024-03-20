<template>
  <el-form ref="form" :inline="true" :model="data.form">
    <div style="display: flex">
      <div style="flex: 1">
        <!-- <el-form-item label="结算时间">
          <el-date-picker
            v-model="data.form.date"
            value-format="yyyy/MM/dd"
            :default-value="data.form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="userName">
          <el-input
            v-model="data.form.userName"
            style="width: 170px"
            placeholder="Please input userName"
            clearable
          />
        </el-form-item>
        <el-form-item label="email">
          <el-input
            v-model="data.form.email"
            style="width: 170px"
            placeholder="Please input email"
            clearable
          />
        </el-form-item>
        <el-form-item label="mobile">
          <el-input
            v-model="data.form.mobile"
            style="width: 170px"
            placeholder="Please input mobile"
            clearable
          />
        </el-form-item>
        <!-- <el-form-item label="country">
          <el-select
            v-model="data.form.deptCode"
            placeholder="Please select"
            filterable
            clearable
            style="width: 120px"
          >
            <el-option
              v-for="item in data.deptOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
      </div>
      <el-form-item>
        <el-button type="default" style="margin-bottom: 0px" @click="onSubmit"
          >查询</el-button
        >
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
const data = reactive({
  form: {
    // date: null as unknown as [Date, Date],
    // deptCode: "",
    userName: "",
    email: "",
    mobile: "",
  },
  deptOptions: [
    { code: 0, name: "China mainland" },
    { code: 1, name: "others" },
  ],
});

const demoUserStore = useGsDemoUserStore();

onMounted(() => {
  // console.log("loaded");
});

function onSubmit(e: MouseEvent) {
  demoUserStore.getDemoUsers(data.form);
}
</script>

<style lang="scss" scoped>
@import "~/assets/sass/el/searchForm.scss";
</style>
