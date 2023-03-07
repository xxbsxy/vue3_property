import { carStore } from '@/store/car/car'
import { ElMessageBox } from 'element-plus'
const store = carStore()
export function useDeleteCar() {
  const deleteCar = (id: number, realname: string, offset: number) => {
    ElMessageBox.confirm(`确认要删除该停车位吗?`, '删除停车位', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await store.deleteCarAction(id)
      await store.getCarListAction(realname, offset)
    })
  }
  return {
    deleteCar
  }
}
