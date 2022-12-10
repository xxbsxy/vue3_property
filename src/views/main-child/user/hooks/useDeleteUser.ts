import { ElMessageBox } from 'element-plus'
import { userStore } from '@/store/user/user'
const store = userStore()
export function useDeleteUser() {
  // 删除用户
  const deleteUser = (
    id: number,
    username: string,
    userName: string,
    offset: number
  ) => {
    ElMessageBox.confirm(`确认要删除用户${username}吗?`, '删除用户', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await store.deleteUserAction(id)
      await store.getUserList(userName, offset)
    })
  }
  return {
    deleteUser
  }
}
