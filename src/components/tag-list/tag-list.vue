<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-remove="removeTab"
    @tab-change="handleTabChange"
  >
    <el-tab-pane
      v-for="(item, index) in tabList"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable="index !== 0"
      class="tab"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
export default { name: 'tag-list' }
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loginStore } from '@/store/login/login'
import { storeToRefs } from 'pinia'
const store = loginStore()
const { tabList } = storeToRefs(store)
const route = useRoute()
const router = useRouter()
let activeName = ref('')

//移除tab
const removeTab = (name: string) => {
  tabList.value.forEach((item, index) => {
    if (item.name === name) {
      tabList.value.splice(index, 1)
      if (name === route.meta.title) {
        router.push(tabList.value[index - 1].path)
      }
    }
  })
}
//点击tab跳转
const handleTabChange = (name: string) => {
  tabList.value.forEach((item) => {
    if (item.name === name) {
      router.push(item.path)
    }
  })
}

// 监听路由变化增加标签
watch(
  () => route,
  (newvalue) => {
    let flag = true
    activeName.value = newvalue.meta.title as string
    document.title = '物业管理系统-' + newvalue.meta.title
    tabList.value.forEach((item) => {
      if (item.title === newvalue.meta.title) {
        flag = false
      }
    })
    if (flag && route.path !== '/login') {
      tabList.value.push({
        title: newvalue.meta.title as string,
        path: newvalue.path,
        name: newvalue.meta.title as string
      })
    }
  },
  { deep: true, immediate: true }
)
</script>
<style scoped lang="less">
:deep(.el-tabs__header) {
  border: 0 !important;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  margin-right: 10px;
  border-radius: 6px;
}
</style>
