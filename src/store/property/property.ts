import { getPropertyList, updateProperty } from '@/service/property'
import { defineStore } from 'pinia'
import type { IPropertyList, IPropertyListObject, IUpdateData } from './type'
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
      const res = (await getPropertyList(
        realname,
        offset
      )) as IPropertyListObject
      this.propertyList = res.propertyList
      this.total = res.total
    },
    async updatePropertyAction(data: IUpdateData, id: number) {
      console.log(data, id)
      await updateProperty(data, id)
    }
  }
})
