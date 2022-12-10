<template>
  <div class="nav-header">
    <el-menu :default-active="route.path" class="el-menu-vertical-demo" router>
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
            <component
              :is="child.icon"
              style="width: 1em; height: 1em; margin-right: 8px"
            ></component>
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
const route = useRoute()
const { isAdmin } = LocalCache.getCache('user')
const menuList = isAdmin
  ? [
      {
        id: 1,
        name: '用户管理',
        icon: 'UserFilled',
        children: [{ id: 1, name: '用户列表', path: '/user', icon: 'Menu' }]
      },
      {
        id: 2,
        name: '投诉管理',
        icon: 'InfoFilled',
        children: [
          { id: 1, name: '投诉列表', path: '/complaint', icon: 'Menu' }
        ]
      },
      {
        id: 3,
        name: '报修管理',
        icon: 'Tools',
        children: [{ id: 1, name: '报修列表', path: '/repair', icon: 'Menu' }]
      }
    ]
  : [
      {
        id: 1,
        name: '投诉管理',
        icon: 'InfoFilled',
        children: [
          { id: 1, name: '投诉列表', path: '/complaint', icon: 'Menu' }
        ]
      },
      {
        id: 2,
        name: '报修管理',
        icon: 'Tools',
        children: [{ id: 1, name: '报修列表', path: '/repair', icon: 'Menu' }]
      }
    ]
</script>
<style scoped lang="less"></style>
