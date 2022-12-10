import { ElMessageBox } from 'element-plus'
import { repairStore } from '@/store/repair/repair'
const store = repairStore()
export function useDeleteRepair() {
  // 删除报修
  const deleteRepair = (id: number, realname: string, offset: number) => {
    ElMessageBox.confirm(`确认要删除该报修吗?`, '删除报修', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await store.deleteRepairAction(id)
      await store.getRepairListAction(realname, offset)
    })
  }
  return {
    deleteRepair
  }
}
