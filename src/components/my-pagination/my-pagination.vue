<template>
  <div class="my-pagination">
    <el-pagination
      background
      :current-page="currentPage"
      :total="total"
      :page-size="10"
      layout=" prev, pager, next"
      @current-change="handelPageChange"
      hide-on-single-page
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let currentPage = ref(1)
const props = defineProps({
  // 总数
  total: {
    type: Number
  },
  // 页码改变的函数
  pageChange: {
    type: Function,
    default: () => {}
  }
})

// 页码改变的回调
const handelPageChange = (newPage: number) => {
  currentPage.value = newPage
  props.pageChange(newPage)
}
// 重置分页
const resetPage = () => {
  currentPage.value = 1
}

defineExpose({
  resetPage
})
</script>
<style scoped lang="less">
.my-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}
</style>
