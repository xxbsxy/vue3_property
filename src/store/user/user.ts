import { editUser, getUserList, deleteUser, addUser } from '@/service/user'
import { defineStore } from 'pinia'
import type { IUserListResult, IUser, IEditUser, IAddUser } from './type'

export const userStore = defineStore('user', {
  state: () => {
    return {
      userList: [] as IUser[],
      total: 0
    }
  },
  actions: {
    // 获取用户列表的Action
    async getUserList(username?: string, offset?: number) {
      const res = (await getUserList(username, offset)) as IUserListResult
      this.userList = res.userList
      this.total = res.total
    },

    // 编辑用户的Action
    async editUserAction(data: IEditUser, id: number) {
      await editUser(data, id)
    },

    // 删除用户的Action
    async deleteUserAction(id: number) {
      await deleteUser(id)
    },

    // 添加用户的Action
    async addUserAction(data: IAddUser) {
      await addUser(data)
    }
  }
})
