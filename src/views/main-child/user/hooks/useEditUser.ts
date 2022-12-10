import { reactive, ref } from 'vue'
import { userStore } from '@/store/user/user'
import type { IUser } from '@/store/user/type'
const store = userStore()
export function useEditUser() {
  const editUserFormRef = ref() // 编辑用户表单的ref
  const editDialogRef = ref() // 编辑用户表单对话框的ref
  // 编辑用户的表单
  const editForm = reactive({
    username: '',
    realname: '',
    sex: '',
    age: 0,
    phone: ''
  })
  const userId = ref(-1)
  // 编辑用户的规则
  const editUserRules = reactive({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名必须在3到20位之间', trigger: 'blur' }
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
  // 点击编辑获取用户信息
  const editUser = (user: IUser) => {
    editDialogRef.value.open()
    editForm.username = user.username
    editForm.realname = user.realname
    editForm.sex = user.sex
    editForm.age = user.age
    editForm.phone = user.phone
    userId.value = user.id
  }
  // 点击提交派发修改用户的Action
  const putEditUserAction = async (username: string, offset: number) => {
    editUserFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.editUserAction({ ...editForm }, userId.value)
        await store.getUserList(username, offset)
        editDialogRef.value.close()
      }
    })
  }
  return {
    editForm,
    editUserRules,
    editDialogRef,
    editUserFormRef,
    editUser,
    putEditUserAction
  }
}
