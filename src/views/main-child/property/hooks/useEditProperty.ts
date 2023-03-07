import { renderTime } from '@/utils/render-time'
import { ref, reactive } from 'vue'
import { propertyStore } from '@/store/property/property'
const store = propertyStore()
export function useEditProperty() {
  const editPropertyDialogRef = ref() // 编辑物业对话框的ref
  const editPropertyFormRef = ref() // 编辑物业表单的ref
  // 编辑物业的表单
  const editPropertyForm = reactive({
    remark: '',
    fees: '',
    status: '',
    createtime: '',
    endtime: ''
  })
  // 点击编辑打开对话框
  const propertyId = ref(-1)
  const editPropertyBtn = (item: any) => {
    propertyId.value = item.id
    editPropertyForm.remark = item.remark
    editPropertyForm.fees = item.fees
    editPropertyForm.status = item.status
    editPropertyForm.createtime = item.createtime
    editPropertyForm.endtime = item.endtime

    editPropertyDialogRef.value.open()
  }
  // 编辑物业表单的规则
  const editPropertyRule = reactive({
    remark: [
      { required: true, message: '物业费介绍', trigger: 'blur' },
      { min: 0, max: 50, message: '房屋位置最多100个字', trigger: 'blur' }
    ],
    fees: [{ required: true, message: '物业费费用', trigger: 'blur' }]
  })
  // 点击确认派发编辑物业Action
  const putEditPropertyAction = (realname: string, offset: number) => {
    editPropertyFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        editPropertyForm.createtime = renderTime(editPropertyForm.createtime)
        editPropertyForm.endtime = renderTime(editPropertyForm.endtime)

        await store.updatePropertyAction(editPropertyForm, propertyId.value)
        await store.getPropertyListAction(realname, offset)
        editPropertyDialogRef.value.close()
        editPropertyFormRef.value.resetFields()
      }
    })
  }
  return {
    editPropertyDialogRef,
    editPropertyFormRef,
    editPropertyForm,
    editPropertyBtn,
    editPropertyRule,
    putEditPropertyAction
  }
}
