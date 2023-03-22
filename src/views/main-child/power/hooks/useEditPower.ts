import { ref, reactive } from 'vue'
import { renderTime } from '@/utils/render-time'
import { powerStore } from '@/store/power/power'
const store = powerStore()
export function useEditPower() {
  const editPowerDialogRef = ref() // 编辑水电对话框的ref
  const editPowerFormRef = ref() // 编辑水电表单的ref
  const editPowerForm = reactive({
    remark: '',
    water_fees: '',
    electric_fees: '',
    gas_fees: '',
    status: '',
    createtime: '',
    endtime: ''
  })
  // 点击编辑
  const powerId = ref(-1)
  const editPowerBtn = (item: any) => {
    editPowerForm.remark = item.remark
    editPowerForm.water_fees = item.water_fees
    editPowerForm.electric_fees = item.electric_fees
    editPowerForm.gas_fees = item.gas_fees
    editPowerForm.status = item.status
    editPowerForm.createtime = item.createtime
    editPowerForm.endtime = item.endtime
    powerId.value = item.id
    editPowerDialogRef.value.open()
  }
  // 编辑物业表单的规则
  const editPowerRule = reactive({
    remark: [{ min: 0, max: 50, message: '备注最多100个字', trigger: 'blur' }],
    water_fees: [{ required: true, message: '水费不能为空', trigger: 'blur' }],
    electric_fees: [
      { required: true, message: '电费不能为空', trigger: 'blur' }
    ],
    gas_fees: [{ required: true, message: '燃气费不能为空', trigger: 'blur' }]
  })

  const putUpdatePower = (realname: string, offset: number) => {
    editPowerFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        editPowerForm.createtime = renderTime(editPowerForm.createtime)
        editPowerForm.endtime = renderTime(editPowerForm.endtime)

        await store.updatePowerAction(editPowerForm, powerId.value)
        await store.getPowerListAction(realname, offset)
        editPowerDialogRef.value.close()
        editPowerFormRef.value.resetFields()
      }
    })
  }
  return {
    editPowerDialogRef,
    editPowerFormRef,
    editPowerForm,
    editPowerRule,
    powerId,
    editPowerBtn,
    putUpdatePower
  }
}
