import myRequest from './api'

// 获取水电费信息列表
export function getPowerList(realname?: string, offset?: number) {
  return myRequest.request({
    url: '/power',
    params: { realname, offset }
  })
}

interface IUpdateData {
  remark: string
  water_fees: string | number
  gas_fees: string | number
  electric_fees: string | number
  status: string
  createtime: string
  endtime: string
}

// 更改水电费信息列表
export function updatePower(data: IUpdateData, id: number) {
  return myRequest.request({
    method: 'PUT',
    url: `/power/${id}`,
    data
  })
}

// 缴纳水电费用
export function updatePowerStatus(id: number) {
  return myRequest.request({
    method: 'PUT',
    url: `/power/status/${id}`
  })
}
