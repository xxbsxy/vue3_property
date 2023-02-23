import { reactive, ref } from 'vue'
import { repairStore } from '@/store/repair/repair'
const store = repairStore()
export function useAddRepair(userId: number) {
  const addRepairDialogRef = ref() // 添加报修对话框的ref
  const addRepairFormRef = ref() // 添加报修表单的ref

  // 添加报修的表单
  const addRepairForm = reactive({
    content: '',
    place: ''
  })
  // 添加报修表单的规则
  const addRepairRule = reactive({
    content: [
      { required: true, message: '请输入报修内容', trigger: 'blur' },
      { min: 0, max: 100, message: '报修内容最多100个字', trigger: 'blur' }
    ],
    place: [
      { required: true, message: '请输入报修地点', trigger: 'blur' },
      { min: 0, max: 30, message: '报修地点最多30个字', trigger: 'blur' }
    ]
  })
  // 点击添加报修打开对话框
  const addRepair = () => {
    addRepairDialogRef.value.open()
  }
  // 点击确认派发添加报修的Action
  const putAddRepairAction = (realname: string, offset: number) => {
    addRepairFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.addRepairAction(
          addRepairForm.content,
          addRepairForm.place,
          userId
        )
        await store.getRepairListAction(realname, offset)
        addRepairDialogRef.value.close()
      }
    })
  }
  return {
    addRepairDialogRef,
    addRepairFormRef,
    addRepairForm,
    addRepairRule,
    addRepair,
    putAddRepairAction
  }
}
