import { login } from '@/service/login'
import { defineStore } from 'pinia'
import LocalCache from '@/utils/cache'
import type { ILoginResult, IUser, IAccount } from './type'
export const loginStore = defineStore('login', {
  persist: true,
  state: () => {
    return {
      user: {} as IUser
    }
  },
  actions: {
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
    }
  }
})
