import { ref, reactive } from 'vue'
import { complaintStore } from '@/store/complaint/complaint'
const store = complaintStore()
export function useAddComplaint(userId: number) {
  const addComplaintDialogRef = ref() // 添加投诉对话框的ref
  const addComplaintFormRef = ref() // 添加投诉表单的ref
  // 添加投诉的表单
  const addComplaintForm = reactive({
    content: '',
    remark: '',
    type: ''
  })
  // 添加投诉的规则
  const addComplaintRule = reactive({
    content: [
      { required: true, message: '请输入投诉内容', trigger: 'blur' },
      { min: 0, max: 100, message: '投诉内容最多100个字', trigger: 'blur' }
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
  // 点击添加投诉打开对话框
  const addComplaint = () => {
    addComplaintDialogRef.value.open()
  }
  // 点击确认派发添加投诉Action
  const putAddComplaintAction = async (realname: string, offset: number) => {
    addComplaintFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.addComplaintAction(
          addComplaintForm.content,
          addComplaintForm.remark,
          addComplaintForm.type,
          userId
        )
        await store.getComplaintListAction(realname, offset)
        addComplaintDialogRef.value.close()
        addComplaintFormRef.value.resetFields()
      }
    })
  }
  return {
    addComplaintDialogRef,
    addComplaintForm,
    addComplaintRule,
    addComplaintFormRef,
    addComplaint,
    putAddComplaintAction
  }
}
