import { ref, reactive } from 'vue'
import { carStore } from '@/store/car/car'
const store = carStore()
export function useEditCar() {
  const editCarDialogRef = ref() // 编辑停车位对话框的ref
  const editCarFormRef = ref() // 编辑停车位表单的ref
  // 编辑停车位的表单
  const editCarForm = reactive({
    position: '',
    area: '',
    fees: '',
    car_num: '',
    remark: ''
  })
  // 点击编辑打开对话框
  const carId = ref(-1)
  const editCarBtn = (car: any) => {
    carId.value = car.id
    editCarForm.position = car.position
    editCarForm.area = car.area
    editCarForm.fees = car.fees
    editCarForm.car_num = car.car_num

    editCarForm.remark = car.remark
    editCarDialogRef.value.open()
  }
  // 编辑停车位表单的规则
  const editCarRule = reactive({
    position: [
      { required: true, message: '请输入停车位位置', trigger: 'blur' },
      { min: 0, max: 50, message: '停车位位置最多50个字', trigger: 'blur' }
    ],
    area: [
      { required: true, message: '请输入停车位面积', trigger: 'blur' },
      { min: 0, max: 50, message: '停车位面积最多50个字', trigger: 'blur' }
    ],
    fees: [{ required: true, message: '请输入停车位价格', trigger: 'blur' }],
    car_num: [{ required: true, message: '车牌号码', trigger: 'blur' }],

    remark: [
      { required: true, message: '请输入备注', trigger: 'blur' },
      { min: 0, max: 100, message: '备注最多100个字', trigger: 'blur' }
    ]
  })
  // 点击确认派发编辑停车位Action
  const putEditCarAction = (realname: string, offset: number) => {
    editCarFormRef.value.validate(async (isValidate: boolean) => {
      if (isValidate) {
        await store.updateCarAction(editCarForm, carId.value)
        await store.getCarListAction(realname, offset)
        editCarDialogRef.value.close()
        editCarFormRef.value.resetFields()
      }
    })
  }
  return {
    editCarDialogRef,
    editCarFormRef,
    editCarForm,
    editCarBtn,
    editCarRule,
    putEditCarAction
  }
}
