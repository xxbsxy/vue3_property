import { editUser, getUserList, deleteUser, addUser } from '@/service/user'
import { defineStore } from 'pinia'
import type { IUserListResult, IUser, IEditUser, IAddUser } from './type'

export const userStore = defineStore('user', {
  state: () => {
    return {
      userList: [] as IUser[],
      total: -1
    }
  },
  actions: {
    async getUserList(username?: string, offset?: number) {
      const res = (await getUserList(username, offset)) as IUserListResult
      this.userList = res.userList
      this.total = res.total
    },
    async editUserAction(data: IEditUser, id: number) {
      await editUser(data, id)
    },
    async deleteUserAction(id: number) {
      await deleteUser(id)
    },
    async addUserAction(data: IAddUser) {
      await addUser(data)
    }
  }
})
