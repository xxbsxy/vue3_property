<template>
  <div class="my-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="titleName"
      width="30%"
      align-center
    >
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  titleName: {
    type: String
  },
  confirmFn: {
    type: Function,
    default() {
      return () => {}
    }
  }
})
let dialogVisible = ref(false)
const open = () => {
  dialogVisible.value = true
}
const close = () => {
  dialogVisible.value = false
}
const confirm = () => {
  props.confirmFn()
}
defineExpose({
  open,
  close
})
</script>
<style scoped lang="less"></style>
