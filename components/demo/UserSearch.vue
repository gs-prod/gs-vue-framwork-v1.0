<template>
  <el-form ref="form" :inline="true" :model="data.form">
    <div style="display: flex">
      <div style="flex: 1">
        <el-form-item label="结算时间">
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
        </el-form-item>
        <el-form-item label="country">
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
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="default" @click="onSubmit">查询</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
const data = reactive({
  form: {
    date: null as unknown as [Date, Date],
    deptCode: "",
  },
  deptOptions: [
    { code: 0, name: "China mainland" },
    { code: 1, name: "others" },
  ],
});

onMounted(() => {
  // console.log("loaded");
});

function onSubmit(e: MouseEvent) {
  console.log("execute a query");
}
</script>

<style lang="scss" scoped>
@import "~/assets/sass/el/searchForm.scss";
</style>
