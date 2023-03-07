import myRequest from './api'

interface IUpdateData {
  remark: string
  fees: string | number
  status: string
  createtime: string
  endtime: string
}
// 获取物业信息列表
export function getPropertyList(realname?: string, offset?: number) {
  return myRequest.request({
    url: '/property',
    params: { realname, offset }
  })
}
// 编辑物业信息
export function updateProperty(data: IUpdateData, id: number) {
  return myRequest.request({
    method: 'PUT',
    url: `/property/${id}`,
    data
  })
}
