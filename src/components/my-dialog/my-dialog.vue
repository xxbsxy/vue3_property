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
  // 标题名字
  titleName: {
    type: String
  },
  // 确认按钮的触发函数
  confirmFn: {
    type: Function,
    default() {
      return () => {}
    }
  }
})

// 对话框的显示与隐藏
let dialogVisible = ref(false)

// 打开对话框
const open = () => {
  dialogVisible.value = true
}

// 关闭对话框
const close = () => {
  dialogVisible.value = false
}

// 点击确认触发的函数
const confirm = () => {
  props.confirmFn()
}

// 对外暴露的变量
defineExpose({
  open,
  close
})
</script>
<style scoped lang="less"></style>
