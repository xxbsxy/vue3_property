import { ElMessageBox } from 'element-plus'
import { complaintStore } from '@/store/complaint/complaint'
const store = complaintStore()
export function useDeleteComplaint() {
  // 删除投诉
  const deleteComplaint = (id: number, realname: string, offset: number) => {
    ElMessageBox.confirm(`确认要删除该投诉吗?`, '删除投诉', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await store.deleteComplaintAction(id)
      await store.getComplaintListAction(realname, offset)
    })
  }
  return {
    deleteComplaint
  }
}
