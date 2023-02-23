<template>
  <div class="login">
    <el-row>
      <el-col :lg="16" :md="12" class="left-area">
        <h1>物业管理系统</h1>
      </el-col>
      <el-col :lg="8" :md="12" class="right-area">
        <div class="content">
          <h1 class="title-login">登录</h1>
          <!-- 登录表单 -->
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            status-icon
            :rules="loginRules"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                :prefix-icon="UserFilled"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="PhoneFilled"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button class="login-btn" color="#626aef" @click="login"
            >登录</el-button
          >
          <div class="text">用户账号: ikun 密码: 123456 仅供测试</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { UserFilled, PhoneFilled } from '@element-plus/icons-vue'

import { useLogin } from './hooks/useLogin'
import type { ElForm } from 'element-plus'

const { loginFormRef, loginForm, loginRules, login } = useLogin()
</script>
<style scoped lang="less">
.login {
  height: 100%;
  .el-row {
    height: 100%;
  }
  .left-area,
  .right-area {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    width: 250px;
  }
  .left-area {
    background-color: #6366f1;
    h1 {
      color: #fff;
      font-size: 50px;
    }
  }
  .right-area {
    .login-btn {
      width: 100%;
      border-radius: 10px;
    }
    h1 {
      text-align: center;
    }
    .title-login {
      margin-bottom: 20px;
    }
    .text {
      margin-top: 20px;
      font-size: 14px;
      color: #192ea8;
    }
  }
}
</style>
