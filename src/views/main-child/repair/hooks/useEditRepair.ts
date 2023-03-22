import { reactive, ref } from 'vue'
import { repairStore } from '@/store/repair/repair'
import type { IRepairList } from '@/store/repair/type'
const store = repairStore()
export function useEditRepair() {
  const editRepairDialogRef = ref() // 编辑报修对话框的ref
  const editRepairFormRef = ref() // 编辑报修对话框的ref
  const repairId = ref(0) //编辑报修的Id

  // 编辑报修表单
  const editRepairForm = reactive({
    content: '',
    place: '',
    remark: '',
    type: '',
    status: ''
  })

  // 编辑报修表单的规则
  const editRepairRule = reactive({
    content: [
      { required: true, message: '请输入报修内容', trigger: 'blur' },
      { min: 0, max: 100, message: '报修内容最多100个字', trigger: 'blur' }
    ],
    place: [
      { required: true, message: '请输入报修地点', trigger: 'blur' },
      { min: 0, max: 30, message: '报修地点最多30个字', trigger: 'blur' }
    ],
    remark: [
      { required: true, message: '请输入备注', trigger: 'blur' },
      { min: 0, max: 30, message: '备注最多100个字', trigger: 'blur' }
    ],
    type: [
      { required: true, message: '请输入报修类型', trigger: 'blur' },
      { min: 0, max: 30, message: '报修类型最多10个字', trigger: 'blur' }
    ]
  })

  // 点击编辑按钮获取报修的内容并打开对话框
  const editRepair = (repair: IRepairList) => {
    editRepairForm.content = repair.content
    editRepairForm.place = repair.place
    editRepairForm.remark = repair.remark
    editRepairForm.type = repair.type

    editRepairForm.status = repair.status
    repairId.value = repair.id
    editRepairDialogRef.value.open()
  }

  // 点击确认派发编辑报修的Action
  const putEditRepairAction = (realname: string, offset: number) => {
    editRepairFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.updateRepairAction(
          editRepairForm.content,
          editRepairForm.place,
          editRepairForm.remark,
          editRepairForm.type,
          editRepairForm.status,
          repairId.value
        )
        await store.getRepairListAction(realname, offset)
        editRepairDialogRef.value.close()
        handleRepairDialogRef.value.close()
      }
    })
  }

  // 处理报修

  const handleRepairDialogRef = ref() // 处理报修对话框的ref
  // 点击确认获取处理投诉的内容并打开对话框
  const handelRepair = (repair: IRepairList) => {
    editRepairForm.content = repair.content
    editRepairForm.place = repair.place
    editRepairForm.remark = repair.remark
    editRepairForm.type = repair.type
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
