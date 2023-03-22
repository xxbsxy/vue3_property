import { defineStore } from 'pinia'
import LocalCache from '@/utils/cache'
import { getPowerList, updatePower, updatePowerStatus } from '@/service/power'
import type { IPowerListRes, PowerList, IUpdateData } from './type'
export const powerStore = defineStore('power', {
  persist: true,
  state: () => {
    return {
      powerList: [] as PowerList[],
      total: 0
    }
  },
  actions: {
    async getPowerListAction(realname?: string, offset?: number) {
      const { realName, isAdmin } = LocalCache.getCache('user')

      if (isAdmin) {
        const res = (await getPowerList(realname, offset)) as IPowerListRes
        this.powerList = res.powerList
        this.total = res.total
      } else {
        const res = (await getPowerList(realName)) as IPowerListRes
        this.powerList = res.powerList
        this.total = res.total
      }
    },
    async updatePowerAction(data: IUpdateData, id: number) {
      await updatePower(data, id)
    },
    async updatePowerStatusAction(id: number) {
      await updatePowerStatus(id)
    }
  }
})
