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
  total: {
    type: Number
  },
  pageChange: {
    type: Function,
    default: () => {}
  }
})
const handelPageChange = (newPage: number) => {
  currentPage.value = newPage
  props.pageChange(newPage)
}

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
