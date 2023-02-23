<template>
  <div class="not-found">
    <el-result icon="warning" title="404" sub-title="你的页面走丢了">
      <template #extra>
        <el-button type="primary" @click="backHome">返回登录页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// 返回登录页
const backHome = () => {
  router.replace('/login')
}
</script>
<style scoped lang="less">
.not-found {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
