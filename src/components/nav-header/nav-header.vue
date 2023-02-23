<template>
  <div class="nav-header">
    <div class="left-area">
      <h2 class="title">物业管理系统</h2>
      <div class="icons">
        <Fold
          style="width: 1.8em; height: 1.8em; margin-right: 8px"
          class="fold"
          color="#fff"
          v-show="!isCollapse"
          @click="changeCollapse"
        />
        <Expand
          style="width: 1.8em; height: 1.8em; margin-right: 8px"
          class="fold"
          color="#fff"
          v-show="isCollapse"
          @click="changeCollapse"
        />
      </div>
    </div>

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
const { user, isCollapse } = storeToRefs(store)
const router = useRouter()

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
const changeCollapse = () => {
  store.isCollapse = !store.isCollapse
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
  .left-area {
    display: flex;
    .title {
      width: 200px;
    }
    .icons {
      .fold {
        cursor: pointer;
      }
    }
  }
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
