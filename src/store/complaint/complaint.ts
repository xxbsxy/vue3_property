import {
  getComplaintList,
  updateComplaint,
  deleteComplaint,
  addComplaint,
  getUserComplaintList
} from '@/service/complaint'
import { defineStore } from 'pinia'
import type { IComplaintList, IComplaintListRes } from './type'
import LocalCache from '@/utils/cache'
export const complaintStore = defineStore('complaint', {
  state: () => {
    return {
      complaintList: [] as IComplaintList[],
      total: 0
    }
  },
  actions: {
    // 获取投诉列表的Action
    async getComplaintListAction(realname?: string, offset?: number) {
      const { isAdmin, userId } = LocalCache.getCache('user')
      if (isAdmin) {
        const res = (await getComplaintList(
          realname,
          offset
        )) as IComplaintListRes
        this.complaintList = res.complaintList
        this.total = res.total
      } else {
        const res = (await getUserComplaintList(
          userId,
          offset
        )) as IComplaintListRes
        this.complaintList = res.complaintList
        this.total = res.total
      }
    },

    // 更新投诉的Action
    async updateComplaintAction(
      content: string,
      remark: string,
      type: string,
      status: string,
      id: number
    ) {
      await updateComplaint(content, remark, type, status, id)
    },

    // 删除投诉的Action
    async deleteComplaintAction(id: number) {
      await deleteComplaint(id)
    },

    // 添加投诉的Action
    async addComplaintAction(
      content: string,
      remark: string,
      type: string,
      userId: number
    ) {
      await addComplaint(content, remark, type, userId)
    }
  }
})
