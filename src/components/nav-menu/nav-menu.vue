<template>
  <div class="nav-header">
    <el-menu
      :default-active="route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
    >
      <el-sub-menu v-for="item in menuList" :key="item.id" :index="item.name">
        <template #title>
          <component
            :is="item.icon"
            style="width: 1em; height: 1em; margin-right: 8px"
          ></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="child in item.children"
            :key="child.id"
            :index="child.path"
          >
            {{ child.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import LocalCache from '@/utils/cache'
import { loginStore } from '@/store/login/login'
import { storeToRefs } from 'pinia'
const store = loginStore()
const { isCollapse } = storeToRefs(store)
const route = useRoute()
const { isAdmin } = LocalCache.getCache('user')
// 菜单
const menuList = isAdmin
  ? [
      {
        id: 1,
        name: '用户管理',
        icon: 'UserFilled',
        children: [{ id: 1, name: '用户列表', path: '/user' }]
      },
      {
        id: 2,
        name: '投诉管理',
        icon: 'InfoFilled',
        children: [{ id: 1, name: '投诉列表', path: '/complaint' }]
      },
      {
        id: 3,
        name: '报修管理',
        icon: 'Tools',
        children: [{ id: 1, name: '报修列表', path: '/repair' }]
      }
    ]
  : [
      {
        id: 1,
        name: '投诉管理',
        icon: 'InfoFilled',
        children: [{ id: 1, name: '投诉列表', path: '/complaint' }]
      },
      {
        id: 2,
        name: '报修管理',
        icon: 'Tools',
        children: [{ id: 1, name: '报修列表', path: '/repair' }]
      }
    ]
</script>
<style scoped lang="less"></style>
