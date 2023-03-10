import {
  getPropertyList,
  updateProperty,
  updatePropertyStatus
} from '@/service/property'
import { defineStore } from 'pinia'
import type { IPropertyList, IPropertyListObject, IUpdateData } from './type'
import LocalCache from '@/utils/cache'
export const propertyStore = defineStore('property', {
  persist: true,
  state: () => {
    return {
      propertyList: [] as IPropertyList[],
      total: 0
    }
  },
  actions: {
    async getPropertyListAction(realname?: string, offset?: number) {
      const { realName, isAdmin } = LocalCache.getCache('user')
      if (isAdmin) {
        const res = (await getPropertyList(
          realname,
          offset
        )) as IPropertyListObject
        this.propertyList = res.propertyList
        this.total = res.total
      } else {
        const res = (await getPropertyList(realName)) as IPropertyListObject
        this.propertyList = res.propertyList
        this.total = res.total
      }
    },
    async updatePropertyAction(data: IUpdateData, id: number) {
      await updateProperty(data, id)
    },
    async updatePropertyStatusAction(id: number) {
      await updatePropertyStatus(id)
    }
  }
})
