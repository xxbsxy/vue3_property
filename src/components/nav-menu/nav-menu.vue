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
        id: 0,
        name: '后台首页',
        icon: 'Menu',
        children: [{ id: 1, name: '后台首页', path: '/home' }]
      },
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
      },
      {
        id: 4,
        name: '房屋管理',
        icon: 'HomeFilled',
        children: [{ id: 1, name: '房屋列表', path: '/house' }]
      },
      {
        id: 5,
        name: '停车位管理',
        icon: 'Promotion',
        children: [{ id: 1, name: '停车位列表', path: '/car' }]
      },
      {
        id: 6,
        name: '物业费管理',
        icon: 'List',
        children: [{ id: 1, name: '物业费列表', path: '/property' }]
      },
      {
        id: 6,
        name: '水电费管理',
        icon: 'Briefcase',
        children: [{ id: 1, name: '水电费列表', path: '/power' }]
      }
    ]
  : [
      {
        id: 1,
        name: '个人中心',
        icon: 'UserFilled',
        children: [{ id: 1, name: '个人资料', path: '/information' }]
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
      },
      {
        id: 4,
        name: '房屋管理',
        icon: 'HomeFilled',
        children: [{ id: 1, name: '我的房屋', path: '/house' }]
      },
      {
        id: 5,
        name: '停车位管理',
        icon: 'Promotion',
        children: [{ id: 1, name: '我的停车位', path: '/car' }]
      },
      {
        id: 6,
        name: '物业费管理',
        icon: 'List',
        children: [{ id: 1, name: '物业费列表', path: '/property' }]
      },
      {
        id: 7,
        name: '水电费管理',
        icon: 'Briefcase',
        children: [{ id: 1, name: '水电费列表', path: '/power' }]
      }
    ]
</script>
<style scoped lang="less"></style>
