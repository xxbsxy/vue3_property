<template>
  <el-card class="information">
    <h2 class="title">个人信息</h2>
    <el-form
      label-width="100px"
      :model="editForm"
      style="max-width: 460px"
      :rules="editUserRules"
      ref="editUserFormRef"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="editForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="editForm.password" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="editForm.realname" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="editForm.age" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="editForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="editForm.phone" />
      </el-form-item>
    </el-form>
    <el-button type="primary" class="btn" @click="putEditUserAction"
      >保存更改</el-button
    >
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { loginStore } from '@/store/login/login'
import { storeToRefs } from 'pinia'
const store = loginStore()
const { user } = storeToRefs(store)
// 编辑用户的表单
const editForm = reactive({
  username: user.value.username,
  password: user.value.password,
  realname: user.value.realname,
  sex: user.value.sex,
  age: user.value.age,
  phone: user.value.phone
})
const editUserFormRef = ref() // 编辑用户表单的ref
// 点击提交派发修改用户的Action
const putEditUserAction = async () => {
  editUserFormRef.value.validate(async (isValidate: boolean) => {
    if (isValidate) {
      store.editUserAction(editForm, user.value.id)
    }
  })
}
// 编辑用户的规则
const editUserRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名必须在3到20位之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 50, message: '密码必须在6到50位之间', trigger: 'blur' }
  ],
  realname: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '真实姓名必须在2到10位之间', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    {
      pattern: /^[1-9]\d?$|^1[01]\d$|^120$/,
      message: '年龄要在1到120岁之间'
    }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
    {
      pattern:
        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: '请输入正确的手机号码'
    }
  ]
})
</script>
<style scoped lang="less">
.title {
  margin-left: 30px;
  margin-bottom: 30px;
}
.btn {
  margin-left: 50px;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>
