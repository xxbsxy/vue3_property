import { defineStore } from 'pinia'
import { getHomeList, deleteHome, addHome, updateHome } from '@/service/home'
import type { IHomeList, IHomeListObject, IAddHomeData } from './type'
export const homeStore = defineStore('home', {
  persist: true,
  state: () => {
    return {
      homeList: [] as IHomeList[],
      total: 0
    }
  },
  actions: {
    // 获取房屋列表
    async getHomeListAction(realname?: string, offset?: number) {
      const res = (await getHomeList(realname, offset)) as IHomeListObject
      this.total = res.total
      this.homeList = res.homeList
    },

    // 删除一个房屋
    async deleteHomeAction(id: number) {
      await deleteHome(id)
    },
    // 添加一个房屋
    async addHomeAction(data: IAddHomeData) {
      await addHome(data)
    },
    // 更新一个房屋
    async updateHomeAction(data: IAddHomeData, id: number) {
      await updateHome(data, id)
    }
  }
})
