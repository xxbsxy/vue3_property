<template>
  <div class="nav-header">
    <h2>物业管理系统</h2>
    <div class="right-area">
      <el-dropdown>
        <span class="username">
          {{ user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import LocalCache from '@/utils/cache'
import { ElMessageBox } from 'element-plus'
import { loginStore } from '@/store/login/login'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const store = loginStore()
const { user } = storeToRefs(store)
const router = useRouter()
// 编辑用户的hooks
// 退出登录
const outLogin = () => {
  ElMessageBox.confirm(`确认要退出登录吗?`, '退出登录', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    LocalCache.clearCache()
    router.push('/login')
  })
}
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  position: relative;
  height: 64px;
  color: rgb(240, 240, 240);
  font-weight: 400;
  .right-area {
    position: absolute;
    right: 30px;
    .username {
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
