<template>
  <el-container class="container">
    <el-header class="header">
      <nav-header></nav-header>
    </el-header>
    <el-container>
      <el-aside class="aside" :class="!isCollapse ? 'aside' : 'collapse-aside'">
        <nav-menu></nav-menu>
      </el-aside>
      <el-main class="main" :class="!isCollapse ? 'main' : 'collapse-main'">
        <tag-list></tag-list>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="8">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import navMenu from '@/components/nav-menu/nav-menu.vue'
import navHeader from '@/components/nav-header/nav-header.vue'
import TagList from '@/components/tag-list/tag-list.vue'
import { loginStore } from '@/store/login/login'
import { storeToRefs } from 'pinia'
const store = loginStore()
const { isCollapse } = storeToRefs(store)
</script>
<style scoped lang="less">
.container {
  height: 100%;
  .header {
    position: relative;
    height: 64px;
    background-color: #4338ca;
    transition: background-color 0.4s ease-in;
  }
  .aside {
    position: absolute;
    left: 0;
    top: 64px;
    bottom: 0;
    width: 210px;
  }
  .collapse-aside {
    position: absolute;
    left: 0;
    top: 64px;
    bottom: 0;
    width: 64px;
  }
  .main {
    position: absolute;
    left: 210px;
    right: 0;
    top: 64px;
    bottom: 0;
    overflow-y: scroll;
    background-color: #f1f2f6;
    transition: background-color 0.4s ease-in;
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s ease;
    }
    .fade-enter-active {
      transition-delay: 0.2s;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }
  .collapse-main {
    position: absolute;
    left: 64px;
    right: 0;
    top: 64px;
    bottom: 0;
    overflow-y: scroll;
    background-color: #f1f2f6;
    transition: background-color 0.4s ease-in;
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s ease;
    }
    .fade-enter-active {
      transition-delay: 0.2s;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
