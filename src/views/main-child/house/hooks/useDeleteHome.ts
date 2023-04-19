import { ElMessageBox } from 'element-plus'
import { homeStore } from '@/store/home/home'
const store = homeStore()
export function useDeleteHome() {
  // 删除房屋
  const deleteHome = (id: number, realname: string, offset: number) => {
    ElMessageBox.confirm(`确认要删除该房屋吗?`, '删除房屋', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await store.deleteHomeAction(id)
      await store.getHomeListAction(realname, offset)
    })
  }
  return {
    deleteHome
  }
}
