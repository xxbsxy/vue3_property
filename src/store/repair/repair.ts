import {
  getRepairList,
  updateRepair,
  deleteRepair,
  addRepair,
  getUserRepairList
} from '@/service/repair'
import { defineStore } from 'pinia'
import type { IRepairListRes, IRepairList } from './type'
import LocalCache from '@/utils/cache'
export const repairStore = defineStore('repair', {
  persist: true,
  state: () => {
    return {
      repairList: [] as IRepairList[],
      total: 0
    }
  },
  actions: {
    // 获取报修列表的Action
    async getRepairListAction(realname?: string, offset?: number) {
      const { isAdmin, userId } = LocalCache.getCache('user')
      if (isAdmin) {
        const res = (await getRepairList(realname, offset)) as IRepairListRes
        this.repairList = res.repairList
        this.total = res.total
      } else {
        console.log(1)
        const res = (await getUserRepairList(userId, offset)) as IRepairListRes
        console.log(res)
        this.repairList = res.repairList
        this.total = res.total
      }
    },
    // 更新报修的Action
    async updateRepairAction(
      content: string,
      place: string,
      remark: string,
      type: string,
      status: string,
      id: number
    ) {
      await updateRepair(content, place, remark, type, status, id)
    },
    // 删除报修的Action
    async deleteRepairAction(id: number) {
      await deleteRepair(id)
    },
    // 添加报修的Action
    async addRepairAction(
      content: string,
      place: string,
      remark: string,
      type: string,
      userId: number
    ) {
      await addRepair(content, place, remark, type, userId)
    }
  }
})
