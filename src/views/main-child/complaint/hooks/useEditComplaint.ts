import { ref, reactive } from 'vue'
import { complaintStore } from '@/store/complaint/complaint'
const store = complaintStore()
export function useEditComplaint() {
  const editComplaintDialogRef = ref() // 编辑投诉对话框的ref
  const editComplaintFormRef = ref() // 编辑投诉表单的ref
  const editComplaintForm = reactive({
    content: '',
    remark: '',
    type: '',
    status: '',
    handle_user: '',
    handle_phone: ''
  })
  const editComplaintRule = reactive({
    content: [
      { required: true, message: '请输入投诉内容', trigger: 'blur' },
      { min: 0, max: 100, message: '投诉内容最多100个字', trigger: 'blur' }
    ],
    remark: [
      { required: true, message: '请输入备注', trigger: 'blur' },
      { min: 0, max: 30, message: '备注最多100个字', trigger: 'blur' }
    ],
    type: [
      { required: true, message: '请输入投诉类型', trigger: 'blur' },
      { min: 0, max: 30, message: '投诉类型最多10个字', trigger: 'blur' }
    ],
    handle_user: [
      { message: '请输入处理人员的名字', trigger: 'blur' },
      { min: 0, max: 10, message: '处理人员的名字最多10个字', trigger: 'blur' }
    ],
    handle_phone: [
      { message: '请输入手机号码', trigger: 'blur' },
      { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
      {
        pattern:
          /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        message: '请输入正确的手机号码'
      }
    ]
  })
  const complaintId = ref(-1)
  // 点击编辑按钮获取投诉内容
  const editContent = (complaint: any) => {
    editComplaintForm.content = complaint.content
    editComplaintForm.remark = complaint.remark
    editComplaintForm.type = complaint.type
    editComplaintForm.handle_phone = complaint.handle_phone
    editComplaintForm.handle_user = complaint.handle_user

    editComplaintForm.status = complaint.status
    complaintId.value = complaint.id
    editComplaintDialogRef.value.open()
  }
  // 点击确认派发编辑投诉Action
  const putEditComplaintAction = async (realname: string, offset: number) => {
    editComplaintFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.updateComplaintAction(
          editComplaintForm.content,
          editComplaintForm.remark,
          editComplaintForm.type,
          editComplaintForm.status,
          editComplaintForm.handle_phone,
          editComplaintForm.handle_user,
          complaintId.value
        )
        await store.getComplaintListAction(realname, offset)
        editComplaintDialogRef.value.close()
        handleComplaintDialogRef.value.close()
      }
    })
  }
  // 处理投诉
  const handleComplaintDialogRef = ref()
  const handleComplaint = (complaint: any) => {
    editComplaintForm.content = complaint.content
    editComplaintForm.status = complaint.status
    editComplaintForm.handle_phone = complaint.handle_phone
    editComplaintForm.handle_user = complaint.handle_user
    complaintId.value = complaint.id
    handleComplaintDialogRef.value.open()
  }
  return {
    editComplaintDialogRef,
    editComplaintForm,
    editComplaintRule,
    editComplaintFormRef,
    editContent,
    putEditComplaintAction,
    handleComplaintDialogRef,
    handleComplaint
  }
}
