import { homeStore } from '@/store/home/home'
import { ref, reactive } from 'vue'
const store = homeStore()
export function useEditHome() {
  const editHomeDialogRef = ref() // 编辑房屋对话框的ref
  const editHomeFormRef = ref() // 编辑房屋表单的ref
  // 编辑房屋的表单
  const editHomeForm = reactive({
    position: '',
    area: '',
    des: '',
    type: ''
  })
  // 点击编辑打开对话框
  const homeId = ref(-1)
  const editHomeBtn = (home: any) => {
    homeId.value = home.id
    editHomeForm.position = home.position
    editHomeForm.area = home.area
    editHomeForm.des = home.des
    editHomeForm.type = home.type
    editHomeDialogRef.value.open()
  }
  // 编辑房屋表单的规则
  const editHomeRule = reactive({
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
    ],
    type: [
      { required: true, message: '请输入房屋类型', trigger: 'blur' },
      { min: 0, max: 250, message: '房屋类型最多10个字', trigger: 'blur' }
    ]
  })
  // 点击确认派发编辑房屋Action
  const putEditHomeAction = (realname: string, offset: number) => {
    editHomeFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.updateHomeAction(editHomeForm, homeId.value)
        await store.getHomeListAction(realname, offset)
        editHomeDialogRef.value.close()
        editHomeFormRef.value.resetFields()
      }
    })
  }
  return {
    editHomeDialogRef,
    editHomeFormRef,
    editHomeForm,
    editHomeRule,
    editHomeBtn,
    putEditHomeAction
  }
}
