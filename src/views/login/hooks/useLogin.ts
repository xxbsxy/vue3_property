import { reactive, ref } from 'vue'
import { loginStore } from '@/store/login/login'
import type { ElForm, FormRules } from 'element-plus'
import LocalCache from '@/utils/cache'
import router from '@/router'
const store = loginStore()
export function useLogin() {
  const loginFormRef = ref<InstanceType<typeof ElForm>>()
  //登录表单
  const loginForm = reactive({
    username: 'admin',
    password: '123456'
  })
  //登录表单规则
  const loginRules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名3-20个之间', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码要在6-20个之间', trigger: 'blur' }
    ]
  })
  //点击登录按钮登录
  const login = () => {
    loginFormRef.value?.validate(async (isvalidate: boolean) => {
      if (isvalidate) {
        await store.loginAction({ ...loginForm })
        store.tabList = []
        const { isAdmin } = LocalCache.getCache('user')
        if (isAdmin) {
          router.push('/user')
        } else {
          router.push('/information')
        }
      }
    })
  }
  //按回车登录
  const onKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      login()
    }
  }
  return { loginFormRef, loginForm, onKeyUp, loginRules, login }
}
