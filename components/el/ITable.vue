<template>
  <div>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      :max-height="tableMaxHeight"
      :height="tableHeight"
      :stripe="true"
      :highlight-current-row="true"
      @row-click="rowClick"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="39"
        align="left"
      ></el-table-column>
      <template v-for="item in data.labelListWidth" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
      </template>
      <slot name="default" />
    </el-table>
    <el-pagination
      v-if="pagination"
      style="margin-top: 5px"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
interface ITableProps {
  tableData: NonNullable<any[]>;
  labelList: NonNullable<LabelList[]>;
  selection: boolean;
  pagination: boolean;
  total: NonNullable<number>;
  currentPage: NonNullable<number>;
  pageSize: NonNullable<number>;
  tableLoading: boolean;
  tableMaxHeight: string;
  tableHeight: string;
  // objectSpanMethod: () => {};
}

const props = withDefaults(defineProps<ITableProps>(), {
  selection: true,
  pagination: true,
  tableLoading: false,
  tableMaxHeight: "42vh",
  tableHeight: "42vh",
});

const data = reactive({
  currentPage4: undefined as number | undefined,
  labelListWidth: [] as {
    label: string;
    prop: string;
    width: string | number;
  }[],
  delay: 700,
  clicks: 0,
  timer: null as unknown as ReturnType<typeof setTimeout>,
});

type Emits = {
  (event: "row-click", value: string): void;
  (event: "row-dblclick", value: string): void;
  (event: "current-change", value: number): void;
};

const emits = defineEmits<Emits>();

onMounted(() => {
  data.labelListWidth = props.labelList.map((item) => {
    return {
      label: item.label,
      prop: item.prop,
      width: tableHeadLength(item.label),
    };
  });
});
// @ts-ignore
function rowClick(row) {
  data.clicks++;
  if (data.clicks === 1) {
    data.timer = setTimeout(() => {
      data.clicks = 0;
      emits("row-click", row);
    }, data.delay);
  } else {
    clearTimeout(data.timer);
    data.clicks = 0;
    emits("row-dblclick", row);
  }
}

function handleSizeChange() {}

function handleCurrentChange(value: number) {
  emits("current-change", value);
}

function tableHeadLength(label: string) {
  label = label || "";
  if (label && label.length > 8) {
    return label.length * 20;
  } else {
    return "";
  }
}
</script>

<style>
.exportBtn {
  float: right;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
