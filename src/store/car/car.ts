import { getCarList, deleteCar, addCar, updateCar } from '@/service/car'
import { defineStore } from 'pinia'
import type {
  ICarList,
  ICarListObject,
  IAddCarData,
  IUpdateCarData
} from './type'
import LocalCache from '@/utils/cache'
export const carStore = defineStore('car', {
  persist: true,
  state: () => {
    return {
      carList: [] as ICarList[],
      total: 0
    }
  },
  actions: {
    // 获取车位的Action
    async getCarListAction(realname?: string, offset?: number) {
      const { realName, isAdmin } = LocalCache.getCache('user')
      if (isAdmin) {
        const res = (await getCarList(realname, offset)) as ICarListObject
        this.carList = res.carList
        this.total = res.total
      } else {
        const res = (await getCarList(realName, offset)) as ICarListObject
        this.carList = res.carList
        this.total = res.total
      }
    },
    // 删除车位的Action
    async deleteCarAction(id: number) {
      await deleteCar(id)
    },
    // 添加车位的Action
    async addCarAction(data: IAddCarData) {
      await addCar(data)
    },
    // 更新投诉的Action
    async updateCarAction(data: IUpdateCarData, id: number) {
      await updateCar(data, id)
    }
  }
})
