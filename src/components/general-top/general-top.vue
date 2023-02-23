<template>
  <div class="general-top">
    <el-form :model="queryForm" v-if="isAdmin">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item>
            <el-input
              :placeholder="placeholder"
              width="200px"
              v-model="queryForm.username"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="search"
            >查询</el-button
          >
          <el-button :icon="Refresh" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="title">
      <h2 class="name">{{ titleName }}</h2>
      <el-button type="primary" class="add-btn" v-if="isBtnShow" @click="add">
        {{ btnName }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Refresh } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import LocalCache from '@/utils/cache'
const { isAdmin } = LocalCache.getCache('user')
const props = defineProps({
  // 标题文字
  titleName: {
    type: String
  },
  // 添加按钮的文字
  btnName: {
    type: String
  },
  // 输入框默认文字
  placeholder: {
    type: String,
    default: '请输入用户名查询'
  },
  // 添加按钮的显示与隐藏
  isBtnShow: {
    type: Boolean,
    default: true
  },
  // 搜素按钮的函数
  searchFn: {
    type: Function,
    default() {
      return () => {}
    }
  },
  // 重置按钮的函数
  resetFn: {
    type: Function,
    default() {
      return () => {}
    }
  },
  // 添加按钮的函数
  addFn: {
    type: Function,
    default() {
      return () => {}
    }
  }
})
const queryForm = reactive({
  username: ''
})
// 搜索
const search = () => {
  props.searchFn(queryForm.username)
}
// 重置
const reset = () => {
  queryForm.username = ''
  props.resetFn()
}
// 添加
const add = () => {
  props.addFn()
}
</script>
<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 15px;
  .add-btn {
    margin-right: 3px;
  }
  .name {
    margin-left: 3px;
    font-weight: 400;
    font-size: 18px;
  }
}
</style>
