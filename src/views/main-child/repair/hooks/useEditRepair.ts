import { reactive, ref } from 'vue'
import { repairStore } from '@/store/repair/repair'
const store = repairStore()
export function useEditRepair() {
  const editRepairDialogRef = ref()
  const editRepairFormRef = ref()

  const editRepairForm = reactive({
    content: '',
    place: '',
    status: ''
  })
  const repairId = ref(0)
  const editRepairRule = reactive({
    content: [
      { required: true, message: '请输入报修内容', trigger: 'blur' },
      { min: 0, max: 100, message: '报修内容最多100个字', trigger: 'blur' }
    ],
    place: [
      { required: true, message: '请输入报修地点', trigger: 'blur' },
      { min: 0, max: 30, message: '报修地点最多30个字', trigger: 'blur' }
    ]
  })
  // 点击编辑按钮
  const editRepair = (repair: any) => {
    editRepairForm.content = repair.content
    editRepairForm.place = repair.place
    editRepairForm.status = repair.status
    repairId.value = repair.id
    editRepairDialogRef.value.open()
  }
  const putEditRepairAction = (realname: string, offset: number) => {
    editRepairFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.updateRepairAction(
          editRepairForm.content,
          editRepairForm.place,
          editRepairForm.status,
          repairId.value
        )
        await store.getRepairListAction(realname, offset)
        editRepairDialogRef.value.close()
        handleRepairDialogRef.value.close()
      }
    })
  }
  // 处理投诉
  const handleRepairDialogRef = ref()
  const handelRepair = (repair: any) => {
    editRepairForm.content = repair.content
    editRepairForm.place = repair.place
    editRepairForm.status = repair.status
    repairId.value = repair.id
    handleRepairDialogRef.value.open()
  }
  return {
    editRepairDialogRef,
    editRepairFormRef,
    editRepairForm,
    editRepairRule,
    handleRepairDialogRef,
    handelRepair,
    editRepair,
    putEditRepairAction
  }
}
