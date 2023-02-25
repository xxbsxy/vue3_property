import { homeStore } from '@/store/home/home'
import { ref, reactive } from 'vue'
const store = homeStore()

export function useAddHome() {
  const addHomeDialogRef = ref() // 添加房屋对话框的ref
  const addHomeFormRef = ref() // 添加房屋表单的ref
  // 添加房屋的表单
  const addHomeForm = reactive({
    position: '',
    area: '',
    des: ''
  })
  // 点击添加房屋打开对话框
  const addHomeBtn = () => {
    addHomeDialogRef.value.open()
  }
  // 添加房屋表单的规则
  const addHomeRule = reactive({
    position: [
      { required: true, message: '请输入房屋位置', trigger: 'blur' },
      { min: 0, max: 50, message: '房屋位置最多50个字', trigger: 'blur' }
    ],
    area: [
      { required: true, message: '请输入房屋面积', trigger: 'blur' },
      { min: 0, max: 50, message: '房屋面积最多50个字', trigger: 'blur' }
    ],
    des: [
      { required: true, message: '请输入房屋描述', trigger: 'blur' },
      { min: 0, max: 250, message: '房屋描述最多250个字', trigger: 'blur' }
    ]
  })
  // 点击确认派发添加房屋Action
  const putAddHomeAction = (realname: string, offset: number) => {
    addHomeFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.addHomeAction(addHomeForm)
        await store.getHomeListAction(realname, offset)
        addHomeDialogRef.value.close()
        addHomeFormRef.value.resetFields()
      }
    })
  }
  return {
    addHomeDialogRef,
    addHomeFormRef,
    addHomeForm,
    addHomeBtn,
    addHomeRule,
    putAddHomeAction
  }
}
