import { ref, reactive } from 'vue'
import { carStore } from '@/store/car/car'
const store = carStore()
export function useAddCar() {
  const addCarDialogRef = ref() // 添加停车位对话框的ref
  const addCarFormRef = ref() // 添加停车位表单的ref
  // 添加停车位的表单
  const addCarForm = reactive({
    position: '',
    area: '',
    fees: '',
    remark: ''
  })
  // 点击添加停车位打开对话框
  const addCarBtn = () => {
    addCarDialogRef.value.open()
  }
  // 添加停车位表单的规则
  const addCarRule = reactive({
    position: [
      { required: true, message: '请输入停车位位置', trigger: 'blur' },
      { min: 0, max: 50, message: '停车位位置最多50个字', trigger: 'blur' }
    ],
    area: [
      { required: true, message: '请输入停车位面积', trigger: 'blur' },
      { min: 0, max: 50, message: '停车位面积最多50个字', trigger: 'blur' }
    ],
    fees: [{ required: true, message: '请输入停车位价格', trigger: 'blur' }],
    remark: [
      { required: true, message: '请输入备注', trigger: 'blur' },
      { min: 0, max: 100, message: '备注最多100个字', trigger: 'blur' }
    ]
  })
  // 点击确认派发添加停车位Action
  const putAddCarAction = (realname: string, offset: number) => {
    addCarFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.addCarAction(addCarForm)
        await store.getCarListAction(realname, offset)
        addCarDialogRef.value.close()
        addCarFormRef.value.resetFields()
      }
    })
  }
  return {
    addCarDialogRef,
    addCarFormRef,
    addCarForm,
    addCarBtn,
    addCarRule,
    putAddCarAction
  }
}
