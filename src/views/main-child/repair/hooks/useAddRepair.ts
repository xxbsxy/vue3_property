import { reactive, ref } from 'vue'
import { repairStore } from '@/store/repair/repair'
const store = repairStore()
export function useAddRepair(userId: number) {
  const addRepairDialogRef = ref()
  const addRepairFormRef = ref()

  const addRepairForm = reactive({
    content: '',
    place: ''
  })
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
  const addRepair = () => {
    addRepairDialogRef.value.open()
  }
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
