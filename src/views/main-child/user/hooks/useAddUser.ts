import { reactive, ref } from 'vue'
import { userStore } from '@/store/user/user'
const store = userStore()
export function useAddUser() {
  const addUserFormRef = ref() // 添加用户表单的ref
  const addDialogRef = ref() // 添加用户表单对话框的ref
  // 添加用户的表单
  const addUserForm = reactive({
    username: '',
    realname: '',
    password: '',
    sex: '男',
    age: '',
    phone: '',
    role: '用户'
  })
  //添加用户的规则
  const addUserRules = reactive({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名必须在3到20位之间', trigger: 'blur' }
    ],
    realname: [
      { required: true, message: '请输入真实姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '真实姓名必须在2到10位之间', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码必须在6到20位之间', trigger: 'blur' }
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
  // 点击提交派发添加用户的Action
  const putAddUserAction = (username: string, offset: number) => {
    addUserFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.addUserAction({ ...addUserForm })
        await store.getUserList(username, offset)
        addDialogRef.value.close()
      }
    })
  }

  // 点击添加用户打开对话框
  const clickAddBtn = () => {
    addDialogRef.value.open()
  }
  return {
    addUserForm,
    addUserRules,
    addDialogRef,
    addUserFormRef,
    putAddUserAction,
    clickAddBtn
  }
}
