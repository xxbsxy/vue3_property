import { login } from '@/service/login'
import { defineStore } from 'pinia'
import LocalCache from '@/utils/cache'
import type { ILoginResult, IUser, IAccount, ITabList } from './type'
import type { IEditUser } from '../user/type'
import { editUser } from '@/service/user'
export const loginStore = defineStore('login', {
  persist: true,
  state: () => {
    return {
      user: {} as IUser,
      tabList: [] as ITabList[],
      isCollapse: false // 控制菜单的折叠
    }
  },
  actions: {
    // 登录
    async loginAction(data: IAccount) {
      const res = (await login(data)) as ILoginResult
      this.user = res.user
      const isAdmin = res.user.role === '管理员' ? true : false
      LocalCache.setCache('token', res.token)
      LocalCache.setCache('user', {
        isAdmin,
        userId: res.user.id,
        realName: res.user.realname
      })
    },
    // 编辑用户的Action
    async editUserAction(data: IEditUser, id: number) {
      await editUser(data, id)
    }
  }
})
